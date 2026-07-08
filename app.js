// Car Spec Compare -- main app logic.
// Flow per car: pick a model year, then live-search makes -> models -> trims
// (a real type-ahead search box at each step), pulling the option lists from
// fueleconomy.gov as you go. Selecting an item narrows the search to the
// next level; when a level has more than one match you keep searching
// instead of everything resolving automatically -- this is the "ask
// specific questions about model / trim if not identified" behavior.

const MAX_SLOTS = 5;
let nextSlotId = 1;
let slots = [];
let lastFetchTime = null;
// renderSlots() rebuilds the whole slot list from scratch on every keystroke,
// which would otherwise steal focus out of the search box mid-type. Track
// which slot's search input is focused so it can be refocused after re-render.
let focusedSlotId = null;

const SUFFIX_TOKENS = ["hybrid", "plugin", "electric", "awd", "fwd", "rwd", "4wd", "2wd", "4dr", "2dr", "5dr", "3dr", "turbo"];

function stripKnownSuffixes(key) {
  let changed = true;
  while (changed) {
    changed = false;
    for (const s of SUFFIX_TOKENS) {
      if (key.endsWith(s) && key.length > s.length) {
        key = key.slice(0, -s.length);
        changed = true;
      }
    }
  }
  return key;
}

// Filters + ranks a menu list against typed search text (substring match,
// items that start with the text ranked above items that merely contain it).
function filterAndSort(list, text, useSuffixStrip) {
  const key = normalizeKey(text);
  if (!key) return list;
  const scored = [];
  for (const item of list) {
    let k = normalizeKey(item.text);
    if (useSuffixStrip) k = stripKnownSuffixes(k);
    if (!k) continue;
    if (!k.includes(key) && !key.includes(k)) continue;
    const score = k.startsWith(key) || key.startsWith(k) ? 0 : 1;
    scored.push({ item, score });
  }
  scored.sort((a, b) => a.score - b.score);
  return scored.map((s) => s.item);
}

function makeSlot() {
  return {
    id: nextSlotId++,
    phase: "loading-year", // loading-year | make | model | trim | loading | done | error
    errorMsg: "",
    years: [],
    year: null,
    makes: [],
    make: null,
    models: [],
    model: null,
    options: [],
    optionId: null,
    optionText: null,
    searchText: "",
    dropdownOpen: false,
    live: null,
    ref: null,
    trimNote: "",
    // null = not checked yet, "searching", { year } = found in a nearby
    // year, "notfound" = checked nearby years and nothing turned up.
    yearFallback: null,
  };
}

// "Your Car" (slot 0) is remembered across visits so it doesn't need to be
// re-searched every time the app is opened.
const MY_CAR_KEY = "carcompare:myCar";

function persistMyCarIfSlot0(slot) {
  if (slots[0] !== slot) return;
  try {
    localStorage.setItem(MY_CAR_KEY, JSON.stringify({
      year: slot.year, make: slot.make, model: slot.model,
      optionId: slot.optionId, optionText: slot.optionText, trimNote: slot.trimNote,
    }));
  } catch (e) {
    // localStorage full or unavailable -- not remembering is a non-fatal degradation
  }
}

function forgetMyCar() {
  try { localStorage.removeItem(MY_CAR_KEY); } catch (e) {}
  renderSlots();
}

async function restoreMyCar(slot, saved) {
  slot.phase = "loading";
  renderSlots();
  try {
    slot.years = await fetchYears();
    slot.year = saved.year;
    slot.make = saved.make;
    slot.model = saved.model;
    slot.optionId = saved.optionId;
    slot.optionText = saved.optionText;
    slot.trimNote = saved.trimNote || "";
    slot.makes = await fetchMakes(saved.year); // so "Change" can search again later
    slot.live = await fetchVehicleDetail(saved.optionId);
    slot.ref = findReferenceSpecs(saved.make, saved.model);
    slot.phase = "done";
    lastFetchTime = Date.now();
  } catch (err) {
    slot.phase = "error";
    slot.errorMsg = `Couldn't restore your saved car (${err.message || err}). Click "Try again" to search fresh.`;
  }
  renderSlots();
  renderResults();
  updateDataStatus();
}

function addSlot() {
  if (slots.length >= MAX_SLOTS) return;
  const slot = makeSlot();
  slots.push(slot);
  renderSlots();
  initYear(slot);
}

function removeSlot(id) {
  if (slots.length <= 2) return; // always keep at least 2 comparison slots
  slots = slots.filter((s) => s.id !== id);
  renderSlots();
  renderResults();
}

async function initYear(slot) {
  try {
    slot.years = await fetchYears();
    // The newest listed model year is often barely populated yet
    // (manufacturers haven't published everything), so walk backwards
    // until we hit a year with a reasonably complete make list.
    for (const y of slot.years) {
      const testMakes = await fetchMakes(y.value);
      if (testMakes.length >= 30) {
        slot.year = y.value;
        slot.makes = testMakes;
        break;
      }
    }
    if (!slot.year) {
      slot.year = slot.years[0]?.value || null;
      slot.makes = await fetchMakes(slot.year);
    }
    if (!slot.year) throw new Error("Could not retrieve model years from fueleconomy.gov");
    slot.phase = "make";
  } catch (err) {
    slot.phase = "error";
    slot.errorMsg = err.message || String(err);
  }
  renderSlots();
}

async function changeYear(slot, newYear) {
  slot.year = newYear;
  slot.make = null;
  slot.model = null;
  slot.optionId = null;
  slot.optionText = null;
  slot.live = null;
  slot.ref = null;
  slot.searchText = "";
  slot.phase = "loading";
  renderSlots();
  renderResults();
  try {
    slot.makes = await fetchMakes(newYear);
    slot.phase = "make";
  } catch (err) {
    slot.phase = "error";
    slot.errorMsg = err.message || String(err);
  }
  renderSlots();
}

// When a model search comes up empty for the selected year, fueleconomy.gov
// sometimes just has a gap for that specific year (seen with the 2026 Kia
// Telluride -- 2025 and 2027 both have data, 2026 has none at all). Rather
// than leave the user stuck on a "No matches" dead end, check nearby years
// for the same make and offer a one-click switch if one has the model.
async function findYearWithModel(slot) {
  const text = slot.searchText;
  if (!text || !slot.make) return;
  slot.yearFallback = "searching";
  renderSlots();

  const current = parseInt(slot.year, 10);
  const candidates = [];
  for (let d = 1; d <= 3; d++) {
    candidates.push(String(current - d), String(current + d));
  }
  const validYears = candidates.filter((y) => slot.years.some((yy) => yy.value === y));

  for (const y of validYears) {
    try {
      const models = await fetchModels(y, slot.make);
      if (filterAndSort(models, text, true).length) {
        slot.yearFallback = { year: y };
        renderSlots();
        return;
      }
    } catch (err) {
      // ignore and keep trying other candidate years
    }
  }
  slot.yearFallback = "notfound";
  renderSlots();
}

// Switches to a year found by findYearWithModel(), keeping the in-progress
// model search text so the now-matching results show immediately.
async function switchYearForSearch(slot, year) {
  const text = slot.searchText;
  slot.year = year;
  slot.yearFallback = null;
  slot.phase = "loading";
  renderSlots();
  try {
    slot.makes = await fetchMakes(year);
    slot.models = await fetchModels(year, slot.make);
    slot.searchText = text;
    slot.dropdownOpen = true;
    slot.phase = "model";
  } catch (err) {
    slot.phase = "error";
    slot.errorMsg = err.message || String(err);
  }
  renderSlots();
}

async function selectMake(slot, makeText) {
  slot.make = makeText;
  slot.searchText = "";
  slot.dropdownOpen = false;
  slot.phase = "loading";
  renderSlots();
  try {
    slot.models = await fetchModels(slot.year, makeText);
    slot.phase = "model";
  } catch (err) {
    slot.phase = "error";
    slot.errorMsg = err.message || String(err);
  }
  renderSlots();
}

async function selectModel(slot, modelText) {
  slot.model = modelText;
  slot.searchText = "";
  slot.dropdownOpen = false;
  slot.phase = "loading";
  renderSlots();
  try {
    slot.options = await fetchOptions(slot.year, slot.make, modelText);
    if (slot.options.length === 0) {
      throw new Error("No trims found for this year/make/model combination");
    } else if (slot.options.length === 1) {
      slot.optionId = slot.options[0].value;
      slot.optionText = slot.options[0].text;
      await finalize(slot);
      return;
    } else {
      slot.phase = "trim";
    }
  } catch (err) {
    slot.phase = "error";
    slot.errorMsg = err.message || String(err);
  }
  renderSlots();
}

async function selectTrim(slot, optionValue) {
  const opt = slot.options.find((o) => o.value === optionValue);
  slot.optionId = opt.value;
  slot.optionText = opt.text;
  slot.searchText = "";
  slot.dropdownOpen = false;
  slot.phase = "loading";
  renderSlots();
  try {
    await finalize(slot);
  } catch (err) {
    slot.phase = "error";
    slot.errorMsg = err.message || String(err);
    renderSlots();
  }
}

async function finalize(slot, force) {
  slot.live = await fetchVehicleDetail(slot.optionId, force);
  slot.ref = findReferenceSpecs(slot.make, slot.model);
  slot.phase = "done";
  lastFetchTime = Date.now();
  persistMyCarIfSlot0(slot);
  renderSlots();
  renderResults();
  updateDataStatus();
}

function changeSlot(slot) {
  slot.make = null;
  slot.model = null;
  slot.models = [];
  slot.options = [];
  slot.optionId = null;
  slot.optionText = null;
  slot.live = null;
  slot.ref = null;
  slot.searchText = "";
  slot.trimNote = "";
  slot.phase = "make";
  renderSlots();
  renderResults();
}

async function refreshSlot(slot) {
  if (slot.phase !== "done") return;
  slot.phase = "loading";
  renderSlots();
  try {
    await finalize(slot, true);
  } catch (err) {
    slot.phase = "error";
    slot.errorMsg = err.message || String(err);
    renderSlots();
  }
}

async function refreshAll() {
  const done = slots.filter((s) => s.phase === "done");
  for (const s of done) {
    await refreshSlot(s);
  }
  if (done.length === 0) {
    updateDataStatus();
  }
}

function updateDataStatus() {
  const statusEl = document.getElementById("dataStatusText");
  if (lastFetchTime) {
    const d = new Date(lastFetchTime);
    statusEl.textContent = `Live data from fueleconomy.gov — last updated ${d.toLocaleString()} (auto-refreshes every 30 days)`;
  } else {
    statusEl.textContent = "Live data from fueleconomy.gov — not yet fetched";
  }
}

// ---------- Rendering ----------

function el(tag, props, ...children) {
  const node = document.createElement(tag);
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === "class") node.className = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else if (k === "html") node.innerHTML = v;
      else node.setAttribute(k, v === true ? "" : v);
    }
  }
  for (const c of children.flat()) {
    if (c == null) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}

// Adds one of the "commonly compared" suggestions as a new comparison car,
// auto-resolving make/model/trim (picking the first trim match) so it's a
// true one-click add. The user can still refine it via "Change" afterward.
async function addSuggestedCar(entry) {
  let slot = slots.find((s) => s.phase === "make" && !s.make);
  if (!slot) {
    if (slots.length >= MAX_SLOTS) return;
    slot = makeSlot();
    slots.push(slot);
    renderSlots();
    await initYear(slot);
    if (slot.phase !== "make") return; // initYear failed -- error already shown
  }

  slot.phase = "loading";
  renderSlots();
  try {
    if (!slot.makes.length) slot.makes = await fetchMakes(slot.year);
    const makeKey = normalizeKey(entry.make);
    const makeMatch = slot.makes.find((m) => normalizeKey(m.text) === makeKey) || slot.makes.find((m) => normalizeKey(m.text).includes(makeKey));
    if (!makeMatch) throw new Error(`Couldn't find ${entry.make} for model year ${slot.year}`);
    slot.make = makeMatch.text;

    slot.models = await fetchModels(slot.year, slot.make);
    const modelKey = normalizeKey(entry.model);
    const modelMatch = slot.models.find((m) => {
      const k = stripKnownSuffixes(normalizeKey(m.text));
      return k === modelKey || k.includes(modelKey) || modelKey.includes(k);
    });
    if (!modelMatch) throw new Error(`Couldn't find ${entry.model} for ${slot.year} ${slot.make}`);
    slot.model = modelMatch.text;

    slot.options = await fetchOptions(slot.year, slot.make, slot.model);
    if (!slot.options.length) throw new Error("No trims found for this year/make/model combination");
    slot.optionId = slot.options[0].value;
    slot.optionText = slot.options[0].text;
    await finalize(slot);
  } catch (err) {
    slot.phase = "error";
    slot.errorMsg = err.message || String(err);
    renderSlots();
  }
}

// Renders "cars often compared with this one" suggestion chips for a
// resolved car, each with a one-click "Add to compare" button.
function renderSuggestions(slot) {
  if (!slot.ref) return null;
  // Use each resolved car's own matched *curated entry* (not its raw
  // fueleconomy model text, which often carries suffixes like "AWD" that
  // wouldn't match the curated dataset's key) so already-added cars are
  // correctly excluded from their own suggestion list.
  const excludeKeys = slots
    .filter((s) => s.phase === "done" && s.ref)
    .map((s) => `${normalizeKey(s.ref.make)}|${normalizeKey(s.ref.model)}`);
  const suggestions = suggestSimilarCars(slot.make, slot.model, excludeKeys, 4);
  if (!suggestions.length) return null;

  const categoryLabel = CATEGORY_LABELS[slot.ref.category] || "similar cars";
  return el("div", { class: "suggestions" },
    el("div", { class: "suggestions-title" }, `Often compared with this ${categoryLabel}:`),
    el("div", { class: "suggestions-list" },
      ...suggestions.map((entry) => el("div", { class: "suggestion-chip" },
        el("span", null, `${entry.make} ${entry.model}`),
        el("button", {
          class: "link-btn",
          disabled: slots.length >= MAX_SLOTS && !slots.some((s) => s.phase === "make" && !s.make) ? "disabled" : null,
          onclick: () => addSuggestedCar(entry),
        }, "+ Add to compare"),
      )),
    ),
  );
}

// YouTube search links for a resolved car. There's no free/keyless API to
// look up a specific matching video, so these open a YouTube search --
// reliable, no API key needed, and still one click from the actual reviews.
function reviewLinks(slot) {
  return [
    el("a", { class: "link-btn", href: youtubeSearchUrl(slot.year, slot.make, slot.model), target: "_blank", rel: "noopener" }, "Reviews on YouTube"),
    el("a", { class: "link-btn", href: youtubeSearchUrl(slot.year, slot.make, slot.model, "Car Mom"), target: "_blank", rel: "noopener" }, "\"Car Mom\" review"),
  ];
}

// Config describing what list/labels/handler apply for each search phase.
function searchPhaseConfig(slot) {
  return {
    make: { list: slot.makes, placeholder: "Search makes… e.g. Honda", suffixStrip: false, select: selectMake },
    model: { list: slot.models, placeholder: "Search models… e.g. Civic", suffixStrip: true, select: selectModel },
    trim: { list: slot.options, placeholder: "Search trims / engines…", suffixStrip: false, select: selectTrim },
  }[slot.phase];
}

// Builds just the suggestion dropdown for a slot's current search text. Kept
// separate from renderSearchBox so typing/focus/blur can patch only this
// element instead of tearing down and rebuilding the <input> itself (which
// would steal focus mid-keystroke).
function buildDropdownNode(slot) {
  const phaseConfig = searchPhaseConfig(slot);
  if (!phaseConfig || !slot.dropdownOpen) return null;
  const filtered = filterAndSort(phaseConfig.list, slot.searchText, phaseConfig.suffixStrip);
  const items = filtered.slice(0, 30);

  if (items.length) {
    return el("div", { class: "search-dropdown" },
      items.map((item) => el("button", {
        type: "button",
        class: "search-item",
        onmousedown: (e) => { e.preventDefault(); const val = slot.phase === "trim" ? item.value : item.text; phaseConfig.select(slot, val); },
      }, item.text)),
    );
  }

  if (slot.phase !== "model" || !slot.searchText) {
    return el("div", { class: "search-dropdown" }, el("div", { class: "search-empty" }, "No matches"));
  }

  // Model search came up empty for the current year -- offer to check
  // nearby years, since fueleconomy.gov sometimes just has a gap for one
  // specific model year (e.g. the 2026 Kia Telluride).
  let fallbackNode;
  if (slot.yearFallback === "searching") {
    fallbackNode = el("div", { class: "search-empty" }, "Checking nearby model years…");
  } else if (slot.yearFallback && slot.yearFallback.year) {
    fallbackNode = el("div", { class: "search-empty" },
      `Found in ${slot.yearFallback.year}. `,
      el("button", { class: "link-btn", onmousedown: (e) => { e.preventDefault(); switchYearForSearch(slot, slot.yearFallback.year); } }, `Switch to ${slot.yearFallback.year}`),
    );
  } else if (slot.yearFallback === "notfound") {
    fallbackNode = el("div", { class: "search-empty" }, "Not in nearby model years either — fueleconomy.gov may not cover this model.");
  } else {
    fallbackNode = el("div", { class: "search-empty" },
      "No matches for this model year. ",
      el("button", { class: "link-btn", onmousedown: (e) => { e.preventDefault(); findYearWithModel(slot); } }, "Check nearby years"),
    );
  }
  return el("div", { class: "search-dropdown" }, fallbackNode);
}

// Patches just this slot's dropdown in place, leaving the focused <input>
// untouched (unlike renderSlots(), which rebuilds everything).
function updateSearchDropdown(slot) {
  const box = document.getElementById(`search-box-${slot.id}`);
  if (!box) return; // structure changed elsewhere -- next full render will catch up
  const existing = box.querySelector(".search-dropdown");
  if (existing) existing.remove();
  const node = buildDropdownNode(slot);
  if (node) box.appendChild(node);
}

// Renders the live-search combobox for the current phase (make/model/trim).
function renderSearchBox(slot) {
  const phaseConfig = searchPhaseConfig(slot);
  if (!phaseConfig) return null;

  const input = el("input", {
    type: "text",
    id: `search-input-${slot.id}`,
    placeholder: phaseConfig.placeholder,
    autocomplete: "off",
    name: `car-search-${slot.id}-${slot.phase}`,
    value: slot.searchText,
    oninput: (e) => { slot.searchText = e.target.value; slot.dropdownOpen = true; slot.yearFallback = null; updateSearchDropdown(slot); },
    onfocus: () => { focusedSlotId = slot.id; slot.dropdownOpen = true; updateSearchDropdown(slot); },
    onblur: () => { setTimeout(() => { if (focusedSlotId === slot.id) focusedSlotId = null; slot.dropdownOpen = false; updateSearchDropdown(slot); }, 150); },
    onkeydown: (e) => {
      if (e.key === "Enter") {
        const filtered = filterAndSort(phaseConfig.list, slot.searchText, phaseConfig.suffixStrip);
        if (filtered.length) {
          const val = slot.phase === "trim" ? filtered[0].value : filtered[0].text;
          phaseConfig.select(slot, val);
        }
      } else if (e.key === "Escape") {
        slot.dropdownOpen = false;
        updateSearchDropdown(slot);
      }
    },
  });

  const box = el("div", { class: "search-box", id: `search-box-${slot.id}` }, input);
  const dropdownNode = buildDropdownNode(slot);
  if (dropdownNode) box.appendChild(dropdownNode);
  return box;
}

function renderSlots() {
  const container = document.getElementById("carSlots");
  container.innerHTML = "";
  slots.forEach((slot, idx) => {
    const label = idx === 0 ? "Your Car" : `Comparison Car ${idx}`;
    const card = el("div", { class: "car-slot" });
    card.appendChild(el("h3", null, label));

    if (slot.phase === "loading-year") {
      card.appendChild(el("div", { class: "slot-status" }, "Loading model years…"));
    }

    if (slot.phase === "error") {
      card.appendChild(el("div", { class: "slot-error" }, `⚠ ${slot.errorMsg}`));
      card.appendChild(el("button", { class: "link-btn", onclick: () => (slot.years.length ? changeSlot(slot) : initYear(slot)) }, "Try again"));
    }

    if (slot.year != null) {
      card.appendChild(el("div", { class: "year-row" },
        el("label", null, "Year"),
        el("select", { onchange: (e) => changeYear(slot, e.target.value) },
          ...slot.years.map((y) => el("option", { value: y.value, selected: y.value === slot.year ? "selected" : null }, y.text)),
        ),
      ));
    }

    if (slot.phase === "make" || slot.phase === "model" || slot.phase === "trim" || slot.phase === "loading") {
      const crumbParts = [slot.make, slot.model].filter(Boolean);
      if (crumbParts.length) {
        card.appendChild(el("div", { class: "breadcrumb" }, crumbParts.join(" ▸ ")));
      }
      if (slot.phase === "loading") {
        card.appendChild(el("div", { class: "slot-status" }, "Loading…"));
      } else {
        const searchBox = renderSearchBox(slot);
        if (searchBox) card.appendChild(searchBox);
      }
    }

    if (slot.phase === "done") {
      const title = slot.trimNote ? `${slot.year} ${slot.make} ${slot.model} · ${slot.trimNote}` : `${slot.year} ${slot.make} ${slot.model}`;
      const trimNoteInput = el("input", {
        type: "text",
        class: "trim-note-input",
        placeholder: slot.options.length <= 1 ? "This model's data source doesn't list trim levels — add one for your reference" : "Add trim/note (optional)",
        value: slot.trimNote,
        oninput: (e) => { slot.trimNote = e.target.value; },
        onblur: () => { persistMyCarIfSlot0(slot); renderSlots(); renderResults(); },
      });
      card.appendChild(el("div", { class: "slot-resolved" },
        el("strong", null, title),
        el("div", { class: "resolved-sub" }, slot.optionText || ""),
        el("div", { class: "resolved-sub" }, slot.ref ? "Reference specs matched ✓" : "No curated reference specs for this model — showing live data only"),
        trimNoteInput,
        el("div", { class: "resolved-actions" },
          el("button", { class: "link-btn", onclick: () => changeSlot(slot) }, "Change"),
          el("button", { class: "link-btn", onclick: () => refreshSlot(slot) }, "Refresh this car"),
        ),
        el("div", { class: "resolved-actions" }, ...reviewLinks(slot)),
        idx === 0 ? el("div", { class: "resolved-sub" },
          "This car is remembered and will load automatically next time. ",
          el("button", { class: "link-btn", onclick: () => forgetMyCar() }, "Forget"),
        ) : null,
        idx === 0 ? renderSuggestions(slot) : null,
      ));
    }

    if (slots.length > 2) {
      card.appendChild(el("button", { class: "remove-slot-btn", title: "Remove this car", onclick: () => removeSlot(slot.id) }, "✕"));
    }

    container.appendChild(card);
  });

  document.getElementById("addSlotBtn").disabled = slots.length >= MAX_SLOTS;

  if (focusedSlotId != null) {
    const inputEl = document.getElementById(`search-input-${focusedSlotId}`);
    if (inputEl) {
      inputEl.focus();
      const len = inputEl.value.length;
      inputEl.setSelectionRange(len, len);
    }
  }
}

// ---------- Spec table ----------

function specRows() {
  return [
    { id: "hp", label: "Horsepower", dir: "high", src: "ref",
      en: (r) => `${r.hp} hp`, met: (r) => `${Units.fmt(Units.hpToKw(r.hp), 0)} kW`, val: (r) => r.hp },
    { id: "torque", label: "Torque", dir: "high", src: "ref",
      en: (r) => `${r.torqueLbFt} lb-ft`, met: (r) => `${Units.fmt(Units.lbFtToNm(r.torqueLbFt), 0)} N·m`, val: (r) => r.torqueLbFt },
    { id: "zeroToSixty", label: "0–60 mph (0–97 km/h)", dir: "low", src: "ref",
      en: (r) => `${r.zeroToSixty}s`, met: (r) => `${r.zeroToSixty}s`, val: (r) => r.zeroToSixty },
    { id: "topSpeed", label: "Top Speed", dir: "high", src: "ref",
      en: (r) => `${r.topSpeedMph} mph`, met: (r) => `${Units.fmt(Units.mphToKmh(r.topSpeedMph), 0)} km/h`, val: (r) => r.topSpeedMph },
    { id: "cityMpg", label: "City Fuel Economy", dir: "high", src: "live",
      en: (l) => `${l.city08} mpg`, met: (l) => `${Units.fmt(Units.mpgToL100km(Number(l.city08)), 1)} L/100km`, val: (l) => Number(l.city08) },
    { id: "hwyMpg", label: "Highway Fuel Economy", dir: "high", src: "live",
      en: (l) => `${l.highway08} mpg`, met: (l) => `${Units.fmt(Units.mpgToL100km(Number(l.highway08)), 1)} L/100km`, val: (l) => Number(l.highway08) },
    { id: "combMpg", label: "Combined Fuel Economy", dir: "high", src: "live",
      en: (l) => `${l.comb08} mpg`, met: (l) => `${Units.fmt(Units.mpgToL100km(Number(l.comb08)), 1)} L/100km`, val: (l) => Number(l.comb08) },
    { id: "fuelCost", label: "Estimated Annual Fuel Cost", dir: "low", src: "live",
      en: (l) => `$${Number(l.fuelCost08).toLocaleString()}`, met: (l) => `$${Number(l.fuelCost08).toLocaleString()}`, val: (l) => Number(l.fuelCost08) },
    { id: "co2", label: "CO₂ Emissions", dir: "low", src: "live",
      en: (l) => `${l.co2} g/mi`, met: (l) => `${Units.fmt(Units.gpmToGpkm(Number(l.co2)), 0)} g/km`, val: (l) => Number(l.co2) },
    { id: "cargo", label: "Cargo Volume (Behind Last Row)", dir: "high", src: "ref",
      en: (r) => `${r.cargoCuFt} cu ft`, met: (r) => `${Units.fmt(Units.cuFtToLiters(r.cargoCuFt), 0)} L`, val: (r) => r.cargoCuFt },
    { id: "cargoBehind2nd", label: "Cargo Behind 2nd Row (3rd Row Folded)", dir: "high", src: "ref",
      en: (r) => (r.cargoBehind2ndRowCuFt != null ? `${r.cargoBehind2ndRowCuFt} cu ft` : null),
      met: (r) => (r.cargoBehind2ndRowCuFt != null ? `${Units.fmt(Units.cuFtToLiters(r.cargoBehind2ndRowCuFt), 0)} L` : null),
      val: (r) => (r.cargoBehind2ndRowCuFt != null ? r.cargoBehind2ndRowCuFt : null) },
    { id: "turningRadius", label: "Turning Radius (curb-to-curb)", dir: "low", src: "ref",
      en: (r) => (r.turningRadiusFt != null ? `${r.turningRadiusFt} ft` : null),
      met: (r) => (r.turningRadiusFt != null ? `${Units.fmt(Units.ftToM(r.turningRadiusFt), 1)} m` : null),
      val: (r) => (r.turningRadiusFt != null ? r.turningRadiusFt : null) },
    { id: "seating", label: "Seating Capacity", dir: "high", src: "ref",
      en: (r) => `${r.seating}`, met: (r) => `${r.seating}`, val: (r) => r.seating },
    { id: "curbWeight", label: "Curb Weight", dir: "low", src: "ref",
      en: (r) => `${r.curbWeightLbs.toLocaleString()} lbs`, met: (r) => `${Units.fmt(Units.lbsToKg(r.curbWeightLbs), 0)} kg`, val: (r) => r.curbWeightLbs },
    { id: "basePrice", label: "Base MSRP (approx.)", dir: "low", src: "ref",
      en: (r) => Units.usdToLabel(r.basePriceUsd), met: (r) => Units.usdToLabel(r.basePriceUsd), val: (r) => r.basePriceUsd },
    { id: "topPrice", label: "Top Trim MSRP (approx., loaded)", dir: "low", src: "ref",
      en: (r) => (r.topPriceUsd != null ? Units.usdToLabel(r.topPriceUsd) : null),
      met: (r) => (r.topPriceUsd != null ? Units.usdToLabel(r.topPriceUsd) : null),
      val: (r) => (r.topPriceUsd != null ? r.topPriceUsd : null) },
    { id: "length", label: "Length", dir: null, src: "ref",
      en: (r) => `${r.lengthIn} in`, met: (r) => `${Units.fmt(Units.inToCm(r.lengthIn), 0)} cm`, val: (r) => r.lengthIn },
    { id: "width", label: "Width", dir: null, src: "ref",
      en: (r) => `${r.widthIn} in`, met: (r) => `${Units.fmt(Units.inToCm(r.widthIn), 0)} cm`, val: (r) => r.widthIn },
    { id: "height", label: "Height", dir: null, src: "ref",
      en: (r) => `${r.heightIn} in`, met: (r) => `${Units.fmt(Units.inToCm(r.heightIn), 0)} cm`, val: (r) => r.heightIn },
    { id: "wheelbase", label: "Wheelbase", dir: null, src: "ref",
      en: (r) => `${r.wheelbaseIn} in`, met: (r) => `${Units.fmt(Units.inToCm(r.wheelbaseIn), 0)} cm`, val: (r) => r.wheelbaseIn },
    { id: "displacement", label: "Engine Displacement", dir: null, src: "live",
      en: (l) => `${Units.fmt(Number(l.displ) * 61.0237, 0)} ci`, met: (l) => `${l.displ} L`, val: () => null },
    { id: "cylinders", label: "Cylinders", dir: null, src: "live",
      en: (l) => `${l.cylinders}`, met: (l) => `${l.cylinders}`, val: () => null },
    { id: "drive", label: "Drivetrain", dir: null, src: "live",
      en: (l) => l.drive || "—", met: (l) => l.drive || "—", val: () => null },
    { id: "trans", label: "Transmission", dir: null, src: "live",
      en: (l) => l.trany || "—", met: (l) => l.trany || "—", val: () => null },
    { id: "fuel", label: "Fuel Type", dir: null, src: "live",
      en: (l) => l.fuelType1 || "—", met: (l) => l.fuelType1 || "—", val: () => null },
  ];
}

function renderResults() {
  const section = document.getElementById("resultsSection");
  const done = slots.filter((s) => s.phase === "done");
  if (done.length < 2) {
    section.hidden = true;
    return;
  }
  section.hidden = false;
  const wrap = document.getElementById("compareTableWrap");
  wrap.innerHTML = "";

  const table = el("table", { class: "compare-table" });
  const headRow = el("tr", null,
    el("th", null, "Spec"),
    ...done.map((s, i) => el("th", { class: "th-car" },
      slots.length > 2 ? el("button", { class: "remove-col-btn", title: "Remove from comparison", onclick: () => removeSlot(s.id) }, "✕") : null,
      i === 0 ? "Your Car" : `Car ${i + 1}`,
      el("div", { class: "th-sub" }, s.trimNote ? `${s.year} ${s.make} ${s.model} · ${s.trimNote}` : `${s.year} ${s.make} ${s.model}`),
      el("div", { class: "th-links" }, ...reviewLinks(s)),
    )),
  );
  table.appendChild(el("thead", null, headRow));

  const tbody = el("tbody");
  for (const row of specRows()) {
    const source = done.map((s) => (row.src === "ref" ? s.ref : s.live));
    // Some ref fields (cargo behind 2nd row, turning radius) are only
    // populated for certain vehicles -- hide the whole row unless at
    // least one car in the comparison actually has that spec.
    const hasAnyData = source.some((v) => v != null && row.en(v) != null);
    if (!hasAnyData) continue;

    const values = source.map((v) => (v != null && row.en(v) != null ? row.val(v) : null));
    const numeric = values.filter((v) => typeof v === "number" && !Number.isNaN(v));
    let best = null, worst = null;
    if (row.dir && numeric.length > 1 && new Set(numeric).size > 1) {
      best = row.dir === "high" ? Math.max(...numeric) : Math.min(...numeric);
      worst = row.dir === "high" ? Math.min(...numeric) : Math.max(...numeric);
    }

    const tr = el("tr", null, el("td", { class: "spec-label" }, row.label));
    source.forEach((v, i) => {
      let cell;
      if (v == null || row.en(v) == null) {
        cell = el("td", { class: "cell neutral" }, "N/A");
      } else {
        const en = row.en(v);
        const met = row.met(v);
        const text = met && met !== en ? `${en}  (${met})` : en;
        let cls = "neutral";
        const num = values[i];
        if (best != null && typeof num === "number") {
          if (num === best && best !== worst) cls = "better";
          else if (num === worst && best !== worst) cls = "worse";
        }
        cell = el("td", { class: `cell ${cls}` }, text);
      }
      tr.appendChild(cell);
    });
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  wrap.appendChild(table);
}

// ---------- Init ----------

function init() {
  slots = [makeSlot(), makeSlot(), makeSlot()];
  renderSlots();

  let savedMyCar = null;
  try { savedMyCar = JSON.parse(localStorage.getItem(MY_CAR_KEY)); } catch (e) {}
  if (savedMyCar && savedMyCar.optionId) {
    restoreMyCar(slots[0], savedMyCar);
  } else {
    initYear(slots[0]);
  }
  initYear(slots[1]);
  initYear(slots[2]);

  document.getElementById("addSlotBtn").addEventListener("click", addSlot);
  document.getElementById("refreshAllBtn").addEventListener("click", refreshAll);
  updateDataStatus();

  // Periodic background refresh while the app stays open. This re-checks
  // the cache (not a forced refetch) so it only actually hits the network
  // once the cached vehicle data has passed its TTL.
  setInterval(() => {
    for (const s of slots) {
      if (s.phase === "done") finalize(s, false);
    }
  }, 30 * 60 * 1000);
}

document.addEventListener("DOMContentLoaded", init);
