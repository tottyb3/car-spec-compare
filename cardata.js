// Curated reference specs for popular models.
// Covers specs the free fueleconomy.gov API does not provide
// (horsepower, torque, acceleration, dimensions, weight, cargo, price,
// turning radius). Figures are typical/representative for common trims of
// recent generations and are meant as a reference, not an exact-trim quote.
//
// cargoCuFt = cargo volume with all rows of seats in use (for 3-row
// vehicles this is "behind 3rd row"). cargoBehind2ndRowCuFt is only set for
// 3-row vehicles: cargo volume with the 3rd row folded flat.
// turningRadiusFt = curb-to-curb turning radius (half the published
// turning circle diameter).
//
// Matching key: normalized "make model" (letters/digits only, lowercase).
const CAR_REFERENCE_DATA = [
  { make: "Honda", model: "Civic", years: "2022-2025", hp: 158, torqueLbFt: 138, zeroToSixty: 8.1, topSpeedMph: 112, curbWeightLbs: 2877, cargoCuFt: 14.8, seating: 5, lengthIn: 184.0, widthIn: 70.9, heightIn: 55.7, wheelbaseIn: 107.7, basePriceUsd: 24350, turningRadiusFt: 17.7 },
  { make: "Honda", model: "Accord", years: "2023-2025", hp: 192, torqueLbFt: 192, zeroToSixty: 7.5, topSpeedMph: 130, curbWeightLbs: 3131, cargoCuFt: 16.7, seating: 5, lengthIn: 195.7, widthIn: 73.3, heightIn: 57.1, wheelbaseIn: 111.4, basePriceUsd: 28390, turningRadiusFt: 18.4 },
  { make: "Honda", model: "CR-V", years: "2023-2025", hp: 190, torqueLbFt: 179, zeroToSixty: 8.4, topSpeedMph: 112, curbWeightLbs: 3337, cargoCuFt: 39.3, seating: 5, lengthIn: 184.8, widthIn: 73.5, heightIn: 66.1, wheelbaseIn: 106.3, basePriceUsd: 29700, turningRadiusFt: 19.1 },
  { make: "Honda", model: "Odyssey", years: "2011-2017", hp: 248, torqueLbFt: 250, zeroToSixty: 7.5, topSpeedMph: 112, curbWeightLbs: 4451, cargoCuFt: 38.4, cargoBehind2ndRowCuFt: 93.1, seating: 8, lengthIn: 202.9, widthIn: 78.5, heightIn: 68.4, wheelbaseIn: 118.1, basePriceUsd: 28975, turningRadiusFt: 18.4 },
  { make: "Toyota", model: "Camry", years: "2025", hp: 225, torqueLbFt: 232, zeroToSixty: 7.4, topSpeedMph: 135, curbWeightLbs: 3450, cargoCuFt: 15.1, seating: 5, lengthIn: 193.9, widthIn: 72.4, heightIn: 56.9, wheelbaseIn: 111.2, basePriceUsd: 28400, turningRadiusFt: 19.0 },
  { make: "Toyota", model: "Corolla", years: "2023-2025", hp: 169, torqueLbFt: 151, zeroToSixty: 7.9, topSpeedMph: 118, curbWeightLbs: 3050, cargoCuFt: 13.1, seating: 5, lengthIn: 182.3, widthIn: 70.1, heightIn: 56.5, wheelbaseIn: 106.3, basePriceUsd: 22050, turningRadiusFt: 18.0 },
  { make: "Toyota", model: "RAV4", years: "2023-2025", hp: 203, torqueLbFt: 184, zeroToSixty: 8.0, topSpeedMph: 118, curbWeightLbs: 3455, cargoCuFt: 37.5, seating: 5, lengthIn: 181.5, widthIn: 73.0, heightIn: 67.0, wheelbaseIn: 105.9, basePriceUsd: 28700, turningRadiusFt: 18.1 },
  { make: "Toyota", model: "Highlander", years: "2023-2025", hp: 265, torqueLbFt: 310, zeroToSixty: 7.5, topSpeedMph: 118, curbWeightLbs: 4275, cargoCuFt: 16.0, cargoBehind2ndRowCuFt: 48.4, seating: 8, lengthIn: 194.9, widthIn: 76.0, heightIn: 68.1, wheelbaseIn: 112.2, basePriceUsd: 39400, turningRadiusFt: 19.4 },
  { make: "Mazda", model: "3", years: "2022-2025", hp: 191, torqueLbFt: 186, zeroToSixty: 6.9, topSpeedMph: 130, curbWeightLbs: 3104, cargoCuFt: 20.1, seating: 5, lengthIn: 180.3, widthIn: 70.7, heightIn: 56.9, wheelbaseIn: 107.3, basePriceUsd: 24150, turningRadiusFt: 17.7 },
  { make: "Mazda", model: "CX-5", years: "2023-2025", hp: 187, torqueLbFt: 186, zeroToSixty: 8.0, topSpeedMph: 130, curbWeightLbs: 3536, cargoCuFt: 30.9, seating: 5, lengthIn: 179.1, widthIn: 72.5, heightIn: 65.3, wheelbaseIn: 106.2, basePriceUsd: 29050, turningRadiusFt: 17.7 },
  { make: "Hyundai", model: "Elantra", years: "2023-2025", hp: 147, torqueLbFt: 132, zeroToSixty: 8.5, topSpeedMph: 118, curbWeightLbs: 2811, cargoCuFt: 14.2, seating: 5, lengthIn: 184.1, widthIn: 71.9, heightIn: 55.7, wheelbaseIn: 107.1, basePriceUsd: 21500, turningRadiusFt: 17.4 },
  { make: "Hyundai", model: "Tucson", years: "2022-2025", hp: 187, torqueLbFt: 178, zeroToSixty: 8.6, topSpeedMph: 120, curbWeightLbs: 3410, cargoCuFt: 38.7, seating: 5, lengthIn: 182.7, widthIn: 73.4, heightIn: 65.6, wheelbaseIn: 108.5, basePriceUsd: 28450, turningRadiusFt: 17.4 },
  { make: "Hyundai", model: "Sonata", years: "2023-2025", hp: 191, torqueLbFt: 181, zeroToSixty: 7.6, topSpeedMph: 130, curbWeightLbs: 3232, cargoCuFt: 16.3, seating: 5, lengthIn: 192.9, widthIn: 73.2, heightIn: 56.9, wheelbaseIn: 111.8, basePriceUsd: 26100, turningRadiusFt: 17.7 },
  { make: "Hyundai", model: "Palisade", years: "2026", hp: 291, torqueLbFt: 262, zeroToSixty: 7.7, topSpeedMph: 124, curbWeightLbs: 4550, cargoCuFt: 18.0, cargoBehind2ndRowCuFt: 45.8, seating: 8, lengthIn: 197.4, widthIn: 78.9, heightIn: 68.9, wheelbaseIn: 114.2, basePriceUsd: 37500, turningRadiusFt: 19.4 },
  { make: "Kia", model: "Forte", years: "2022-2025", hp: 147, torqueLbFt: 132, zeroToSixty: 8.7, topSpeedMph: 118, curbWeightLbs: 2814, cargoCuFt: 15.3, seating: 5, lengthIn: 182.7, widthIn: 71.1, heightIn: 56.5, wheelbaseIn: 106.3, basePriceUsd: 20890, turningRadiusFt: 17.4 },
  { make: "Kia", model: "Sportage", years: "2023-2025", hp: 187, torqueLbFt: 178, zeroToSixty: 8.5, topSpeedMph: 120, curbWeightLbs: 3410, cargoCuFt: 39.6, seating: 5, lengthIn: 183.5, widthIn: 73.4, heightIn: 65.4, wheelbaseIn: 108.5, basePriceUsd: 27290, turningRadiusFt: 17.4 },
  { make: "Ford", model: "F-150", years: "2021-2025", hp: 325, torqueLbFt: 400, zeroToSixty: 6.9, topSpeedMph: 99, curbWeightLbs: 4705, cargoCuFt: 52.8, seating: 5, lengthIn: 231.7, widthIn: 79.9, heightIn: 75.6, wheelbaseIn: 145.4, basePriceUsd: 36570, turningRadiusFt: 23.9 },
  { make: "Ford", model: "Mustang", years: "2024-2025", hp: 315, torqueLbFt: 350, zeroToSixty: 5.5, topSpeedMph: 145, curbWeightLbs: 3705, cargoCuFt: 13.5, seating: 4, lengthIn: 189.4, widthIn: 75.4, heightIn: 54.3, wheelbaseIn: 107.1, basePriceUsd: 32515, turningRadiusFt: 18.7 },
  { make: "Ford", model: "Escape", years: "2023-2025", hp: 181, torqueLbFt: 190, zeroToSixty: 8.6, topSpeedMph: 115, curbWeightLbs: 3400, cargoCuFt: 37.5, seating: 5, lengthIn: 180.1, widthIn: 74.1, heightIn: 66.1, wheelbaseIn: 106.7, basePriceUsd: 28590, turningRadiusFt: 18.0 },
  { make: "Chevrolet", model: "Silverado", years: "2022-2025", hp: 355, torqueLbFt: 383, zeroToSixty: 6.7, topSpeedMph: 99, curbWeightLbs: 4844, cargoCuFt: 61.7, seating: 5, lengthIn: 231.7, widthIn: 81.2, heightIn: 75.5, wheelbaseIn: 147.4, basePriceUsd: 38395, turningRadiusFt: 24.5 },
  { make: "Chevrolet", model: "Equinox", years: "2022-2025", hp: 175, torqueLbFt: 203, zeroToSixty: 8.2, topSpeedMph: 115, curbWeightLbs: 3300, cargoCuFt: 29.9, seating: 5, lengthIn: 183.1, widthIn: 72.6, heightIn: 65.8, wheelbaseIn: 107.3, basePriceUsd: 26600, turningRadiusFt: 18.9 },
  { make: "Chevrolet", model: "Malibu", years: "2022-2024", hp: 160, torqueLbFt: 184, zeroToSixty: 8.5, topSpeedMph: 122, curbWeightLbs: 3121, cargoCuFt: 15.8, seating: 5, lengthIn: 193.8, widthIn: 73.6, heightIn: 57.4, wheelbaseIn: 111.4, basePriceUsd: 24500, turningRadiusFt: 19.4 },
  { make: "Tesla", model: "Model 3", years: "2024-2025", hp: 283, torqueLbFt: 310, zeroToSixty: 5.8, topSpeedMph: 140, curbWeightLbs: 3891, cargoCuFt: 19.8, seating: 5, lengthIn: 185.0, widthIn: 72.8, heightIn: 56.8, wheelbaseIn: 113.2, basePriceUsd: 38990, turningRadiusFt: 19.4 },
  { make: "Tesla", model: "Model Y", years: "2024-2025", hp: 295, torqueLbFt: 331, zeroToSixty: 6.0, topSpeedMph: 135, curbWeightLbs: 4416, cargoCuFt: 34.3, seating: 5, lengthIn: 187.0, widthIn: 75.6, heightIn: 63.9, wheelbaseIn: 116.3, basePriceUsd: 44990, turningRadiusFt: 19.4 },
  { make: "Subaru", model: "Outback", years: "2023-2025", hp: 182, torqueLbFt: 176, zeroToSixty: 9.0, topSpeedMph: 120, curbWeightLbs: 3634, cargoCuFt: 32.5, seating: 5, lengthIn: 191.1, widthIn: 72.4, heightIn: 66.1, wheelbaseIn: 108.1, basePriceUsd: 29195, turningRadiusFt: 18.6 },
  { make: "Subaru", model: "Impreza", years: "2024-2025", hp: 182, torqueLbFt: 178, zeroToSixty: 8.2, topSpeedMph: 120, curbWeightLbs: 3025, cargoCuFt: 20.8, seating: 5, lengthIn: 176.5, widthIn: 70.2, heightIn: 57.2, wheelbaseIn: 105.1, basePriceUsd: 23150, turningRadiusFt: 17.9 },
  { make: "Subaru", model: "Forester", years: "2022-2025", hp: 182, torqueLbFt: 176, zeroToSixty: 9.5, topSpeedMph: 117, curbWeightLbs: 3449, cargoCuFt: 28.9, seating: 5, lengthIn: 182.1, widthIn: 71.5, heightIn: 67.5, wheelbaseIn: 105.1, basePriceUsd: 27395, turningRadiusFt: 17.7 },
  { make: "Nissan", model: "Altima", years: "2023-2025", hp: 188, torqueLbFt: 180, zeroToSixty: 8.0, topSpeedMph: 130, curbWeightLbs: 3223, cargoCuFt: 15.4, seating: 5, lengthIn: 192.9, widthIn: 72.9, heightIn: 56.9, wheelbaseIn: 111.2, basePriceUsd: 26900, turningRadiusFt: 19.4 },
  { make: "Nissan", model: "Rogue", years: "2023-2025", hp: 201, torqueLbFt: 225, zeroToSixty: 7.7, topSpeedMph: 118, curbWeightLbs: 3549, cargoCuFt: 36.5, seating: 5, lengthIn: 183.0, widthIn: 72.4, heightIn: 66.5, wheelbaseIn: 106.5, basePriceUsd: 29140, turningRadiusFt: 18.2 },
  { make: "Jeep", model: "Wrangler", years: "2024-2025", hp: 285, torqueLbFt: 260, zeroToSixty: 6.9, topSpeedMph: 99, curbWeightLbs: 4145, cargoCuFt: 31.7, seating: 5, lengthIn: 166.8, widthIn: 73.8, heightIn: 73.6, wheelbaseIn: 96.8, basePriceUsd: 33290, turningRadiusFt: 20.6 },
  { make: "Jeep", model: "Grand Cherokee", years: "2022-2025", hp: 293, torqueLbFt: 260, zeroToSixty: 6.9, topSpeedMph: 121, curbWeightLbs: 4448, cargoCuFt: 37.7, seating: 5, lengthIn: 193.5, widthIn: 77.7, heightIn: 68.4, wheelbaseIn: 116.7, basePriceUsd: 38490, turningRadiusFt: 18.6 },
  { make: "BMW", model: "330i", years: "2023-2025", hp: 255, torqueLbFt: 295, zeroToSixty: 5.6, topSpeedMph: 130, curbWeightLbs: 3600, cargoCuFt: 17.0, seating: 5, lengthIn: 185.7, widthIn: 71.9, heightIn: 56.8, wheelbaseIn: 112.2, basePriceUsd: 44500, turningRadiusFt: 18.4 },
  { make: "Volkswagen", model: "Jetta", years: "2022-2025", hp: 158, torqueLbFt: 184, zeroToSixty: 7.6, topSpeedMph: 126, curbWeightLbs: 3016, cargoCuFt: 14.1, seating: 5, lengthIn: 186.5, widthIn: 70.8, heightIn: 57.7, wheelbaseIn: 105.7, basePriceUsd: 21440, turningRadiusFt: 18.4 },
  { make: "Volkswagen", model: "Tiguan", years: "2022-2024", hp: 184, torqueLbFt: 221, zeroToSixty: 8.1, topSpeedMph: 126, curbWeightLbs: 3611, cargoCuFt: 37.6, seating: 5, lengthIn: 185.1, widthIn: 72.4, heightIn: 66.3, wheelbaseIn: 109.8, basePriceUsd: 28450, turningRadiusFt: 19.2 },
];

// Common nickname/abbreviation aliases -> official fueleconomy.gov make names.
const MAKE_ALIASES = {
  "chevy": "Chevrolet",
  "vw": "Volkswagen",
  "merc": "Mercedes-Benz",
  "mercedes": "Mercedes-Benz",
};

function normalizeKey(str) {
  return String(str || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Finds the best curated reference entry for a make + model string.
// The fueleconomy.gov model text often has suffixes like "4Dr", "AWD",
// "Hybrid" appended -- match by containment on normalized alnum keys.
function findReferenceSpecs(make, model) {
  const makeKey = normalizeKey(make);
  const modelKey = normalizeKey(model);
  if (!makeKey || !modelKey) return null;

  let best = null;
  for (const entry of CAR_REFERENCE_DATA) {
    if (normalizeKey(entry.make) !== makeKey) continue;
    const entryKey = normalizeKey(entry.model);
    if (modelKey.includes(entryKey) || entryKey.includes(modelKey)) {
      if (!best || entryKey.length > normalizeKey(best.model).length) {
        best = entry;
      }
    }
  }
  return best;
}

// Builds a YouTube search-results URL (not a specific video -- there's no
// free/keyless way to look up an exact matching review) for a resolved car.
function youtubeSearchUrl(year, make, model, extraTerms) {
  const query = [year, make, model, extraTerms, "review"].filter(Boolean).join(" ");
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
