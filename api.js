// Wrapper around the free, no-key fueleconomy.gov REST API, with a
// localStorage cache so repeated lookups don't refetch data that
// rarely changes, but data is still periodically refreshed from the
// web rather than baked in permanently.
const FE_BASE = "https://www.fueleconomy.gov/ws/rest";
const CACHE_PREFIX = "carcompare:cache:";
const MENU_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days -- menu lists rarely change
const DETAIL_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days -- per-vehicle spec data

function cacheGet(key, ttlMs) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > ttlMs) return null;
    return data;
  } catch (e) {
    return null;
  }
}

function cacheSet(key, data) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ ts: Date.now(), data }));
  } catch (e) {
    // localStorage full or unavailable -- fail silently, just skip caching
  }
}

function cacheTimestamp(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    return JSON.parse(raw).ts;
  } catch (e) {
    return null;
  }
}

async function fetchXmlMenu(path, params, ttlMs, force) {
  const qs = new URLSearchParams(params).toString();
  const key = path + "?" + qs;
  if (!force) {
    const cached = cacheGet(key, ttlMs);
    if (cached) return cached;
  }
  const res = await fetch(`${FE_BASE}${path}?${qs}`, { headers: { Accept: "application/xml" } });
  if (!res.ok) throw new Error(`fueleconomy.gov request failed (${res.status})`);
  const text = await res.text();
  const doc = new DOMParser().parseFromString(text, "application/xml");
  const items = Array.from(doc.getElementsByTagName("menuItem")).map((el) => ({
    text: el.getElementsByTagName("text")[0]?.textContent ?? "",
    value: el.getElementsByTagName("value")[0]?.textContent ?? "",
  }));
  cacheSet(key, items);
  return items;
}

async function fetchYears(force) {
  return fetchXmlMenu("/vehicle/menu/year", {}, MENU_TTL_MS, force);
}

async function fetchMakes(year, force) {
  return fetchXmlMenu("/vehicle/menu/make", { year }, MENU_TTL_MS, force);
}

async function fetchModels(year, make, force) {
  return fetchXmlMenu("/vehicle/menu/model", { year, make }, MENU_TTL_MS, force);
}

async function fetchOptions(year, make, model, force) {
  return fetchXmlMenu("/vehicle/menu/options", { year, make, model }, MENU_TTL_MS, force);
}

async function fetchVehicleDetail(id, force) {
  const key = `/vehicle/${id}`;
  if (!force) {
    const cached = cacheGet(key, DETAIL_TTL_MS);
    if (cached) return cached;
  }
  const res = await fetch(`${FE_BASE}${key}`, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`fueleconomy.gov vehicle lookup failed (${res.status})`);
  const data = await res.json();
  cacheSet(key, data);
  return data;
}

// Returns the oldest timestamp among a set of cache keys, or null if
// nothing has been cached yet for those keys.
function oldestCacheTimestamp(keys) {
  let oldest = null;
  for (const k of keys) {
    const ts = cacheTimestamp(k);
    if (ts != null && (oldest == null || ts < oldest)) oldest = ts;
  }
  return oldest;
}
