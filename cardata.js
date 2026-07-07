// Curated reference specs for popular models sold in the US (2010+).
// Covers specs the free fueleconomy.gov API does not provide
// (horsepower, torque, acceleration, dimensions, weight, cargo, price,
// turning radius). Figures are typical/representative for a common trim
// of recent generations and are meant as a reference, not an exact-trim
// quote -- especially for nameplates spanning huge trim/powertrain
// spreads (e.g. Camaro V6 vs SS, 911 Carrera vs Turbo S), where the
// horsepower/performance figures reflect the SAME trim as basePriceUsd,
// not necessarily the same trim as topPriceUsd.
//
// basePriceUsd = approx. starting MSRP. topPriceUsd = approx. MSRP for
// that same model fully loaded with its highest non-performance-variant
// trim/options (not a different engine tier like SS/Z06/Plaid/Turbo S,
// which would make the horsepower figures above misleading).
//
// cargoCuFt = cargo volume with all rows of seats in use (for 3-row
// vehicles this is "behind 3rd row"). cargoBehind2ndRowCuFt is only set for
// 3-row vehicles: cargo volume with the 3rd row folded flat.
// turningRadiusFt = curb-to-curb turning radius (half the published
// turning circle diameter).
// category groups models that typically get cross-shopped against each
// other, used to power "cars often compared with this one" suggestions.
//
// Matching key: normalized "make model" (letters/digits only, lowercase).
const CAR_REFERENCE_DATA = [
  // ---- Compact sedans ----
  { make: "Honda", model: "Civic", years: "2022-2025", category: "compact-sedan", hp: 158, torqueLbFt: 138, zeroToSixty: 8.1, topSpeedMph: 112, curbWeightLbs: 2877, cargoCuFt: 14.8, seating: 5, lengthIn: 184.0, widthIn: 70.9, heightIn: 55.7, wheelbaseIn: 107.7, basePriceUsd: 24350, topPriceUsd: 29850, turningRadiusFt: 17.7 },
  { make: "Toyota", model: "Corolla", years: "2023-2025", category: "compact-sedan", hp: 169, torqueLbFt: 151, zeroToSixty: 7.9, topSpeedMph: 118, curbWeightLbs: 3050, cargoCuFt: 13.1, seating: 5, lengthIn: 182.3, widthIn: 70.1, heightIn: 56.5, wheelbaseIn: 106.3, basePriceUsd: 22050, topPriceUsd: 26050, turningRadiusFt: 18.0 },
  { make: "Mazda", model: "3", years: "2022-2025", category: "compact-sedan", hp: 191, torqueLbFt: 186, zeroToSixty: 6.9, topSpeedMph: 130, curbWeightLbs: 3104, cargoCuFt: 20.1, seating: 5, lengthIn: 180.3, widthIn: 70.7, heightIn: 56.9, wheelbaseIn: 107.3, basePriceUsd: 24150, topPriceUsd: 33150, turningRadiusFt: 17.7 },
  { make: "Hyundai", model: "Elantra", years: "2023-2025", category: "compact-sedan", hp: 147, torqueLbFt: 132, zeroToSixty: 8.5, topSpeedMph: 118, curbWeightLbs: 2811, cargoCuFt: 14.2, seating: 5, lengthIn: 184.1, widthIn: 71.9, heightIn: 55.7, wheelbaseIn: 107.1, basePriceUsd: 21500, topPriceUsd: 28800, turningRadiusFt: 17.4 },
  { make: "Kia", model: "Forte", years: "2022-2025", category: "compact-sedan", hp: 147, torqueLbFt: 132, zeroToSixty: 8.7, topSpeedMph: 118, curbWeightLbs: 2814, cargoCuFt: 15.3, seating: 5, lengthIn: 182.7, widthIn: 71.1, heightIn: 56.5, wheelbaseIn: 106.3, basePriceUsd: 20890, topPriceUsd: 26490, turningRadiusFt: 17.4 },
  { make: "Subaru", model: "Impreza", years: "2024-2025", category: "compact-sedan", hp: 182, torqueLbFt: 178, zeroToSixty: 8.2, topSpeedMph: 120, curbWeightLbs: 3025, cargoCuFt: 20.8, seating: 5, lengthIn: 176.5, widthIn: 70.2, heightIn: 57.2, wheelbaseIn: 105.1, basePriceUsd: 23150, topPriceUsd: 28190, turningRadiusFt: 17.9 },
  { make: "Volkswagen", model: "Jetta", years: "2022-2025", category: "compact-sedan", hp: 158, torqueLbFt: 184, zeroToSixty: 7.6, topSpeedMph: 126, curbWeightLbs: 3016, cargoCuFt: 14.1, seating: 5, lengthIn: 186.5, widthIn: 70.8, heightIn: 57.7, wheelbaseIn: 105.7, basePriceUsd: 21440, topPriceUsd: 32025, turningRadiusFt: 18.4 },
  { make: "Nissan", model: "Sentra", years: "2020-2025", category: "compact-sedan", hp: 149, torqueLbFt: 146, zeroToSixty: 8.3, topSpeedMph: 118, curbWeightLbs: 2954, cargoCuFt: 14.3, seating: 5, lengthIn: 182.1, widthIn: 71.5, heightIn: 57.0, wheelbaseIn: 106.6, basePriceUsd: 21590, topPriceUsd: 25390, turningRadiusFt: 17.5 },

  // ---- Midsize sedans ----
  { make: "Honda", model: "Accord", years: "2023-2025", category: "midsize-sedan", hp: 192, torqueLbFt: 192, zeroToSixty: 7.5, topSpeedMph: 130, curbWeightLbs: 3131, cargoCuFt: 16.7, seating: 5, lengthIn: 195.7, widthIn: 73.3, heightIn: 57.1, wheelbaseIn: 111.4, basePriceUsd: 28390, topPriceUsd: 38985, turningRadiusFt: 18.4 },
  { make: "Toyota", model: "Camry", years: "2025", category: "midsize-sedan", hp: 225, torqueLbFt: 232, zeroToSixty: 7.4, topSpeedMph: 135, curbWeightLbs: 3450, cargoCuFt: 15.1, seating: 5, lengthIn: 193.9, widthIn: 72.4, heightIn: 56.9, wheelbaseIn: 111.2, basePriceUsd: 28400, topPriceUsd: 38700, turningRadiusFt: 19.0 },
  { make: "Hyundai", model: "Sonata", years: "2023-2025", category: "midsize-sedan", hp: 191, torqueLbFt: 181, zeroToSixty: 7.6, topSpeedMph: 130, curbWeightLbs: 3232, cargoCuFt: 16.3, seating: 5, lengthIn: 192.9, widthIn: 73.2, heightIn: 56.9, wheelbaseIn: 111.8, basePriceUsd: 26100, topPriceUsd: 35150, turningRadiusFt: 17.7 },
  { make: "Chevrolet", model: "Malibu", years: "2022-2024", category: "midsize-sedan", hp: 160, torqueLbFt: 184, zeroToSixty: 8.5, topSpeedMph: 122, curbWeightLbs: 3121, cargoCuFt: 15.8, seating: 5, lengthIn: 193.8, widthIn: 73.6, heightIn: 57.4, wheelbaseIn: 111.4, basePriceUsd: 24500, topPriceUsd: 32800, turningRadiusFt: 19.4 },
  { make: "Nissan", model: "Altima", years: "2023-2025", category: "midsize-sedan", hp: 188, torqueLbFt: 180, zeroToSixty: 8.0, topSpeedMph: 130, curbWeightLbs: 3223, cargoCuFt: 15.4, seating: 5, lengthIn: 192.9, widthIn: 72.9, heightIn: 56.9, wheelbaseIn: 111.2, basePriceUsd: 26900, topPriceUsd: 37430, turningRadiusFt: 19.4 },

  // ---- Luxury sedans ----
  { make: "BMW", model: "330i", years: "2023-2025", category: "luxury-sedan", hp: 255, torqueLbFt: 295, zeroToSixty: 5.6, topSpeedMph: 130, curbWeightLbs: 3600, cargoCuFt: 17.0, seating: 5, lengthIn: 185.7, widthIn: 71.9, heightIn: 56.8, wheelbaseIn: 112.2, basePriceUsd: 44500, topPriceUsd: 52000, turningRadiusFt: 18.4 },
  { make: "Mercedes-Benz", model: "C300", years: "2022-2025", category: "luxury-sedan", hp: 255, torqueLbFt: 295, zeroToSixty: 5.9, topSpeedMph: 130, curbWeightLbs: 3649, cargoCuFt: 12.6, seating: 5, lengthIn: 187.0, widthIn: 71.3, heightIn: 56.1, wheelbaseIn: 111.8, basePriceUsd: 47450, topPriceUsd: 54000, turningRadiusFt: 18.2 },

  // ---- Compact SUVs / crossovers ----
  { make: "Honda", model: "CR-V", years: "2023-2025", category: "compact-suv", hp: 190, torqueLbFt: 179, zeroToSixty: 8.4, topSpeedMph: 112, curbWeightLbs: 3337, cargoCuFt: 39.3, seating: 5, lengthIn: 184.8, widthIn: 73.5, heightIn: 66.1, wheelbaseIn: 106.3, basePriceUsd: 29700, topPriceUsd: 38550, turningRadiusFt: 19.1 },
  { make: "Toyota", model: "RAV4", years: "2023-2025", category: "compact-suv", hp: 203, torqueLbFt: 184, zeroToSixty: 8.0, topSpeedMph: 118, curbWeightLbs: 3455, cargoCuFt: 37.5, seating: 5, lengthIn: 181.5, widthIn: 73.0, heightIn: 67.0, wheelbaseIn: 105.9, basePriceUsd: 28700, topPriceUsd: 38150, turningRadiusFt: 18.1 },
  { make: "Mazda", model: "CX-5", years: "2023-2025", category: "compact-suv", hp: 187, torqueLbFt: 186, zeroToSixty: 8.0, topSpeedMph: 130, curbWeightLbs: 3536, cargoCuFt: 30.9, seating: 5, lengthIn: 179.1, widthIn: 72.5, heightIn: 65.3, wheelbaseIn: 106.2, basePriceUsd: 29050, topPriceUsd: 39200, turningRadiusFt: 17.7 },
  { make: "Hyundai", model: "Tucson", years: "2022-2025", category: "compact-suv", hp: 187, torqueLbFt: 178, zeroToSixty: 8.6, topSpeedMph: 120, curbWeightLbs: 3410, cargoCuFt: 38.7, seating: 5, lengthIn: 182.7, widthIn: 73.4, heightIn: 65.6, wheelbaseIn: 108.5, basePriceUsd: 28450, topPriceUsd: 39400, turningRadiusFt: 17.4 },
  { make: "Hyundai", model: "Santa Fe", years: "2024-2025", category: "compact-suv", hp: 277, torqueLbFt: 311, zeroToSixty: 7.0, topSpeedMph: 124, curbWeightLbs: 3924, cargoCuFt: 40.5, seating: 5, lengthIn: 188.4, widthIn: 75.8, heightIn: 66.1, wheelbaseIn: 110.2, basePriceUsd: 33450, topPriceUsd: 44450, turningRadiusFt: 18.4 },
  { make: "Kia", model: "Sportage", years: "2023-2025", category: "compact-suv", hp: 187, torqueLbFt: 178, zeroToSixty: 8.5, topSpeedMph: 120, curbWeightLbs: 3410, cargoCuFt: 39.6, seating: 5, lengthIn: 183.5, widthIn: 73.4, heightIn: 65.4, wheelbaseIn: 108.5, basePriceUsd: 27290, topPriceUsd: 38390, turningRadiusFt: 17.4 },
  { make: "Ford", model: "Escape", years: "2023-2025", category: "compact-suv", hp: 181, torqueLbFt: 190, zeroToSixty: 8.6, topSpeedMph: 115, curbWeightLbs: 3400, cargoCuFt: 37.5, seating: 5, lengthIn: 180.1, widthIn: 74.1, heightIn: 66.1, wheelbaseIn: 106.7, basePriceUsd: 28590, topPriceUsd: 38995, turningRadiusFt: 18.0 },
  { make: "Chevrolet", model: "Equinox", years: "2022-2025", category: "compact-suv", hp: 175, torqueLbFt: 203, zeroToSixty: 8.2, topSpeedMph: 115, curbWeightLbs: 3300, cargoCuFt: 29.9, seating: 5, lengthIn: 183.1, widthIn: 72.6, heightIn: 65.8, wheelbaseIn: 107.3, basePriceUsd: 26600, topPriceUsd: 35700, turningRadiusFt: 18.9 },
  { make: "Subaru", model: "Outback", years: "2023-2025", category: "compact-suv", hp: 182, torqueLbFt: 176, zeroToSixty: 9.0, topSpeedMph: 120, curbWeightLbs: 3634, cargoCuFt: 32.5, seating: 5, lengthIn: 191.1, widthIn: 72.4, heightIn: 66.1, wheelbaseIn: 108.1, basePriceUsd: 29195, topPriceUsd: 40195, turningRadiusFt: 18.6 },
  { make: "Subaru", model: "Forester", years: "2022-2025", category: "compact-suv", hp: 182, torqueLbFt: 176, zeroToSixty: 9.5, topSpeedMph: 117, curbWeightLbs: 3449, cargoCuFt: 28.9, seating: 5, lengthIn: 182.1, widthIn: 71.5, heightIn: 67.5, wheelbaseIn: 105.1, basePriceUsd: 27395, topPriceUsd: 38195, turningRadiusFt: 17.7 },
  { make: "Nissan", model: "Rogue", years: "2023-2025", category: "compact-suv", hp: 201, torqueLbFt: 225, zeroToSixty: 7.7, topSpeedMph: 118, curbWeightLbs: 3549, cargoCuFt: 36.5, seating: 5, lengthIn: 183.0, widthIn: 72.4, heightIn: 66.5, wheelbaseIn: 106.5, basePriceUsd: 29140, topPriceUsd: 38070, turningRadiusFt: 18.2 },
  { make: "Volkswagen", model: "Tiguan", years: "2022-2024", category: "compact-suv", hp: 184, torqueLbFt: 221, zeroToSixty: 8.1, topSpeedMph: 126, curbWeightLbs: 3611, cargoCuFt: 37.6, seating: 5, lengthIn: 185.1, widthIn: 72.4, heightIn: 66.3, wheelbaseIn: 109.8, basePriceUsd: 28450, topPriceUsd: 39950, turningRadiusFt: 19.2 },
  { make: "Audi", model: "Q5", years: "2021-2025", category: "compact-suv", hp: 261, torqueLbFt: 273, zeroToSixty: 5.7, topSpeedMph: 130, curbWeightLbs: 4079, cargoCuFt: 25.1, seating: 5, lengthIn: 184.3, widthIn: 74.5, heightIn: 65.5, wheelbaseIn: 111.0, basePriceUsd: 45900, topPriceUsd: 58000, turningRadiusFt: 19.0 },

  // ---- Subcompact SUVs / crossovers ----
  { make: "Honda", model: "HR-V", years: "2023-2025", category: "subcompact-suv", hp: 158, torqueLbFt: 138, zeroToSixty: 8.6, topSpeedMph: 112, curbWeightLbs: 3179, cargoCuFt: 24.4, seating: 5, lengthIn: 179.8, widthIn: 72.4, heightIn: 63.9, wheelbaseIn: 104.7, basePriceUsd: 25350, topPriceUsd: 30070, turningRadiusFt: 17.9 },
  { make: "Mazda", model: "CX-30", years: "2022-2025", category: "subcompact-suv", hp: 191, torqueLbFt: 186, zeroToSixty: 7.2, topSpeedMph: 130, curbWeightLbs: 3488, cargoCuFt: 20.2, seating: 5, lengthIn: 173.0, widthIn: 70.7, heightIn: 61.7, wheelbaseIn: 104.4, basePriceUsd: 24995, topPriceUsd: 34550, turningRadiusFt: 17.7 },
  { make: "Subaru", model: "Crosstrek", years: "2024-2025", category: "subcompact-suv", hp: 182, torqueLbFt: 178, zeroToSixty: 8.7, topSpeedMph: 120, curbWeightLbs: 3168, cargoCuFt: 20.0, seating: 5, lengthIn: 176.3, widthIn: 71.0, heightIn: 63.6, wheelbaseIn: 105.1, basePriceUsd: 25190, topPriceUsd: 34820, turningRadiusFt: 17.9 },
  { make: "Nissan", model: "Kicks", years: "2021-2025", category: "subcompact-suv", hp: 141, torqueLbFt: 107, zeroToSixty: 9.5, topSpeedMph: 106, curbWeightLbs: 2725, cargoCuFt: 25.3, seating: 5, lengthIn: 173.2, widthIn: 69.3, heightIn: 62.4, wheelbaseIn: 103.1, basePriceUsd: 21590, topPriceUsd: 26380, turningRadiusFt: 16.9 },
  { make: "Kia", model: "Seltos", years: "2023-2025", category: "subcompact-suv", hp: 146, torqueLbFt: 132, zeroToSixty: 9.0, topSpeedMph: 112, curbWeightLbs: 3060, cargoCuFt: 26.6, seating: 5, lengthIn: 172.1, widthIn: 70.9, heightIn: 63.4, wheelbaseIn: 103.5, basePriceUsd: 24390, topPriceUsd: 30990, turningRadiusFt: 17.4 },
  { make: "Hyundai", model: "Kona", years: "2024-2025", category: "subcompact-suv", hp: 147, torqueLbFt: 132, zeroToSixty: 8.9, topSpeedMph: 112, curbWeightLbs: 3041, cargoCuFt: 25.5, seating: 5, lengthIn: 171.3, widthIn: 71.9, heightIn: 61.6, wheelbaseIn: 104.7, basePriceUsd: 24500, topPriceUsd: 34750, turningRadiusFt: 17.2 },
  { make: "Hyundai", model: "Venue", years: "2020-2025", category: "subcompact-suv", hp: 121, torqueLbFt: 113, zeroToSixty: 10.5, topSpeedMph: 106, curbWeightLbs: 2679, cargoCuFt: 18.7, seating: 5, lengthIn: 159.9, widthIn: 69.7, heightIn: 61.6, wheelbaseIn: 99.2, basePriceUsd: 20200, topPriceUsd: 24700, turningRadiusFt: 16.7 },
  { make: "Volkswagen", model: "Taos", years: "2022-2025", category: "subcompact-suv", hp: 174, torqueLbFt: 184, zeroToSixty: 7.9, topSpeedMph: 126, curbWeightLbs: 3247, cargoCuFt: 27.9, seating: 5, lengthIn: 175.8, widthIn: 72.7, heightIn: 64.7, wheelbaseIn: 105.6, basePriceUsd: 24855, topPriceUsd: 32255, turningRadiusFt: 18.1 },
  { make: "Jeep", model: "Compass", years: "2025", category: "subcompact-suv", hp: 200, torqueLbFt: 221, zeroToSixty: 7.6, topSpeedMph: 124, curbWeightLbs: 3400, cargoCuFt: 27.7, seating: 5, lengthIn: 175.0, widthIn: 72.7, heightIn: 64.8, wheelbaseIn: 103.8, basePriceUsd: 27995, topPriceUsd: 39995, turningRadiusFt: 18.5 },
  { make: "Kia", model: "Soul", years: "2020-2025", category: "compact-hatchback", hp: 147, torqueLbFt: 132, zeroToSixty: 8.5, topSpeedMph: 112, curbWeightLbs: 2915, cargoCuFt: 24.2, seating: 5, lengthIn: 165.2, widthIn: 70.9, heightIn: 63.0, wheelbaseIn: 102.4, basePriceUsd: 20190, topPriceUsd: 26390, turningRadiusFt: 17.0 },

  // ---- Midsize SUVs (2-row) ----
  { make: "Jeep", model: "Grand Cherokee", years: "2022-2025", category: "midsize-suv", hp: 293, torqueLbFt: 260, zeroToSixty: 6.9, topSpeedMph: 121, curbWeightLbs: 4448, cargoCuFt: 37.7, seating: 5, lengthIn: 193.5, widthIn: 77.7, heightIn: 68.4, wheelbaseIn: 116.7, basePriceUsd: 38490, topPriceUsd: 65900, turningRadiusFt: 18.6 },
  { make: "Toyota", model: "4Runner", years: "2025", category: "midsize-suv", hp: 278, torqueLbFt: 317, zeroToSixty: 7.0, topSpeedMph: 112, curbWeightLbs: 4900, cargoCuFt: 46.3, seating: 5, lengthIn: 194.5, widthIn: 78.3, heightIn: 71.5, wheelbaseIn: 112.2, basePriceUsd: 42750, topPriceUsd: 55450, turningRadiusFt: 20.1 },
  { make: "Nissan", model: "Murano", years: "2023-2025", category: "midsize-suv", hp: 260, torqueLbFt: 240, zeroToSixty: 7.6, topSpeedMph: 130, curbWeightLbs: 3900, cargoCuFt: 32.3, seating: 5, lengthIn: 192.5, widthIn: 75.4, heightIn: 67.0, wheelbaseIn: 111.2, basePriceUsd: 36230, topPriceUsd: 45360, turningRadiusFt: 19.2 },
  { make: "Lexus", model: "RX 350", years: "2023-2025", category: "midsize-suv", hp: 275, torqueLbFt: 317, zeroToSixty: 7.2, topSpeedMph: 124, curbWeightLbs: 4255, cargoCuFt: 29.6, seating: 5, lengthIn: 189.1, widthIn: 75.6, heightIn: 67.1, wheelbaseIn: 112.2, basePriceUsd: 50150, topPriceUsd: 66900, turningRadiusFt: 18.5 },

  // ---- 3-row SUVs ----
  { make: "Toyota", model: "Highlander", years: "2023-2025", category: "3row-suv", hp: 265, torqueLbFt: 310, zeroToSixty: 7.5, topSpeedMph: 118, curbWeightLbs: 4275, cargoCuFt: 16.0, cargoBehind2ndRowCuFt: 48.4, seating: 8, lengthIn: 194.9, widthIn: 76.0, heightIn: 68.1, wheelbaseIn: 112.2, basePriceUsd: 39400, topPriceUsd: 50400, turningRadiusFt: 19.4 },
  { make: "Hyundai", model: "Palisade", years: "2026", category: "3row-suv", hp: 291, torqueLbFt: 262, zeroToSixty: 7.7, topSpeedMph: 124, curbWeightLbs: 4550, cargoCuFt: 18.0, cargoBehind2ndRowCuFt: 45.8, seating: 8, lengthIn: 197.4, widthIn: 78.9, heightIn: 68.9, wheelbaseIn: 114.2, basePriceUsd: 37500, topPriceUsd: 53500, turningRadiusFt: 19.4 },
  { make: "Kia", model: "Telluride", years: "2025-2027", category: "3row-suv", hp: 291, torqueLbFt: 262, zeroToSixty: 7.7, topSpeedMph: 124, curbWeightLbs: 4502, cargoCuFt: 21.4, cargoBehind2ndRowCuFt: 46.9, seating: 8, lengthIn: 199.6, widthIn: 78.3, heightIn: 70.0, wheelbaseIn: 114.2, basePriceUsd: 37000, topPriceUsd: 53900, turningRadiusFt: 19.4 },
  { make: "Lexus", model: "TX 350", years: "2024-2025", category: "3row-suv", hp: 275, torqueLbFt: 317, zeroToSixty: 7.8, topSpeedMph: 118, curbWeightLbs: 4740, cargoCuFt: 21.2, cargoBehind2ndRowCuFt: 57.2, seating: 7, lengthIn: 200.2, widthIn: 78.0, heightIn: 68.1, wheelbaseIn: 116.1, basePriceUsd: 56050, topPriceUsd: 66500, turningRadiusFt: 19.5 },
  { make: "Ford", model: "Explorer", years: "2023-2025", category: "3row-suv", hp: 300, torqueLbFt: 310, zeroToSixty: 7.7, topSpeedMph: 130, curbWeightLbs: 4405, cargoCuFt: 18.2, cargoBehind2ndRowCuFt: 47.9, seating: 7, lengthIn: 199.7, widthIn: 78.9, heightIn: 69.9, wheelbaseIn: 119.1, basePriceUsd: 38365, topPriceUsd: 58840, turningRadiusFt: 19.6 },
  { make: "Chevrolet", model: "Traverse", years: "2024-2025", category: "3row-suv", hp: 328, torqueLbFt: 326, zeroToSixty: 7.0, topSpeedMph: 112, curbWeightLbs: 4400, cargoCuFt: 20.4, cargoBehind2ndRowCuFt: 57.6, seating: 7, lengthIn: 204.3, widthIn: 78.6, heightIn: 69.9, wheelbaseIn: 120.9, basePriceUsd: 34995, topPriceUsd: 53195, turningRadiusFt: 20.0 },
  { make: "GMC", model: "Acadia", years: "2024-2025", category: "3row-suv", hp: 328, torqueLbFt: 326, zeroToSixty: 7.2, topSpeedMph: 112, curbWeightLbs: 4450, cargoCuFt: 19.3, cargoBehind2ndRowCuFt: 55.7, seating: 7, lengthIn: 200.6, widthIn: 78.2, heightIn: 70.0, wheelbaseIn: 116.3, basePriceUsd: 39995, topPriceUsd: 56195, turningRadiusFt: 19.7 },
  { make: "Buick", model: "Enclave", years: "2025", category: "3row-suv", hp: 328, torqueLbFt: 326, zeroToSixty: 7.5, topSpeedMph: 112, curbWeightLbs: 4450, cargoCuFt: 23.3, cargoBehind2ndRowCuFt: 57.6, seating: 7, lengthIn: 204.3, widthIn: 78.7, heightIn: 70.7, wheelbaseIn: 120.9, basePriceUsd: 45900, topPriceUsd: 56900, turningRadiusFt: 20.0 },
  { make: "Honda", model: "Pilot", years: "2023-2025", category: "3row-suv", hp: 285, torqueLbFt: 262, zeroToSixty: 6.9, topSpeedMph: 112, curbWeightLbs: 4235, cargoCuFt: 18.6, cargoBehind2ndRowCuFt: 55.9, seating: 8, lengthIn: 199.9, widthIn: 78.6, heightIn: 70.5, wheelbaseIn: 116.5, basePriceUsd: 40195, topPriceUsd: 53745, turningRadiusFt: 19.4 },
  { make: "Mazda", model: "CX-90", years: "2024-2025", category: "3row-suv", hp: 340, torqueLbFt: 369, zeroToSixty: 6.6, topSpeedMph: 130, curbWeightLbs: 4453, cargoCuFt: 14.9, cargoBehind2ndRowCuFt: 40.1, seating: 7, lengthIn: 200.8, widthIn: 78.5, heightIn: 68.1, wheelbaseIn: 122.8, basePriceUsd: 41225, topPriceUsd: 52050, turningRadiusFt: 19.7 },
  { make: "Subaru", model: "Ascent", years: "2023-2025", category: "3row-suv", hp: 260, torqueLbFt: 277, zeroToSixty: 7.5, topSpeedMph: 112, curbWeightLbs: 4614, cargoCuFt: 17.8, cargoBehind2ndRowCuFt: 47.5, seating: 8, lengthIn: 196.8, widthIn: 76.5, heightIn: 69.4, wheelbaseIn: 113.8, basePriceUsd: 34870, topPriceUsd: 46945, turningRadiusFt: 19.8 },
  { make: "Nissan", model: "Pathfinder", years: "2023-2025", category: "3row-suv", hp: 284, torqueLbFt: 259, zeroToSixty: 6.9, topSpeedMph: 118, curbWeightLbs: 4308, cargoCuFt: 16.6, cargoBehind2ndRowCuFt: 45.0, seating: 8, lengthIn: 197.9, widthIn: 77.9, heightIn: 70.0, wheelbaseIn: 114.2, basePriceUsd: 36685, topPriceUsd: 50045, turningRadiusFt: 19.4 },
  { make: "Volkswagen", model: "Atlas", years: "2024-2025", category: "3row-suv", hp: 269, torqueLbFt: 273, zeroToSixty: 7.7, topSpeedMph: 130, curbWeightLbs: 4237, cargoCuFt: 20.6, cargoBehind2ndRowCuFt: 55.5, seating: 7, lengthIn: 200.7, widthIn: 78.3, heightIn: 70.0, wheelbaseIn: 117.3, basePriceUsd: 36995, topPriceUsd: 53675, turningRadiusFt: 20.0 },
  { make: "Dodge", model: "Durango", years: "2011-2025", category: "3row-suv", hp: 295, torqueLbFt: 260, zeroToSixty: 6.9, topSpeedMph: 130, curbWeightLbs: 4696, cargoCuFt: 17.2, cargoBehind2ndRowCuFt: 47.2, seating: 7, lengthIn: 200.8, widthIn: 84.6, heightIn: 71.5, wheelbaseIn: 119.8, basePriceUsd: 42090, topPriceUsd: 58000, turningRadiusFt: 19.9 },
  { make: "Acura", model: "MDX", years: "2022-2025", category: "3row-suv", hp: 355, torqueLbFt: 354, zeroToSixty: 6.5, topSpeedMph: 124, curbWeightLbs: 4374, cargoCuFt: 18.1, cargoBehind2ndRowCuFt: 47.8, seating: 7, lengthIn: 198.6, widthIn: 78.7, heightIn: 67.4, wheelbaseIn: 113.8, basePriceUsd: 52350, topPriceUsd: 71000, turningRadiusFt: 19.2 },
  { make: "Kia", model: "EV9", years: "2024-2025", category: "3row-suv", hp: 303, torqueLbFt: 446, zeroToSixty: 5.3, topSpeedMph: 115, curbWeightLbs: 5451, cargoCuFt: 20.2, cargoBehind2ndRowCuFt: 46.9, seating: 7, lengthIn: 197.4, widthIn: 78.3, heightIn: 68.2, wheelbaseIn: 122.0, basePriceUsd: 54900, topPriceUsd: 77900, turningRadiusFt: 19.6 },
  { make: "Tesla", model: "Model X", years: "2021-2025", category: "3row-suv", hp: 670, torqueLbFt: 713, zeroToSixty: 3.8, topSpeedMph: 155, curbWeightLbs: 5185, cargoCuFt: 20.9, cargoBehind2ndRowCuFt: 68.6, seating: 6, lengthIn: 198.3, widthIn: 78.7, heightIn: 66.3, wheelbaseIn: 116.7, basePriceUsd: 79990, topPriceUsd: 89990, turningRadiusFt: 20.4 },
  { make: "Rivian", model: "R1S", years: "2022-2025", category: "3row-suv", hp: 533, torqueLbFt: 610, zeroToSixty: 4.5, topSpeedMph: 108, curbWeightLbs: 6963, cargoCuFt: 17.9, cargoBehind2ndRowCuFt: 46.1, seating: 7, lengthIn: 200.8, widthIn: 79.3, heightIn: 72.6, wheelbaseIn: 121.1, basePriceUsd: 78900, topPriceUsd: 92700, turningRadiusFt: 20.4 },

  // ---- Full-size SUVs ----
  { make: "Chevrolet", model: "Tahoe", years: "2021-2025", category: "fullsize-suv", hp: 355, torqueLbFt: 383, zeroToSixty: 6.5, topSpeedMph: 99, curbWeightLbs: 5605, cargoCuFt: 25.5, cargoBehind2ndRowCuFt: 72.6, seating: 8, lengthIn: 210.7, widthIn: 81.2, heightIn: 75.7, wheelbaseIn: 120.9, basePriceUsd: 58295, topPriceUsd: 82395, turningRadiusFt: 19.6 },
  { make: "Chevrolet", model: "Suburban", years: "2021-2025", category: "fullsize-suv", hp: 355, torqueLbFt: 383, zeroToSixty: 6.7, topSpeedMph: 99, curbWeightLbs: 5875, cargoCuFt: 41.5, cargoBehind2ndRowCuFt: 93.8, seating: 8, lengthIn: 225.7, widthIn: 81.2, heightIn: 75.9, wheelbaseIn: 134.1, basePriceUsd: 61195, topPriceUsd: 84695, turningRadiusFt: 21.6 },
  { make: "GMC", model: "Yukon", years: "2021-2025", category: "fullsize-suv", hp: 355, torqueLbFt: 383, zeroToSixty: 6.5, topSpeedMph: 99, curbWeightLbs: 5700, cargoCuFt: 25.5, cargoBehind2ndRowCuFt: 72.6, seating: 8, lengthIn: 210.7, widthIn: 81.2, heightIn: 75.8, wheelbaseIn: 120.9, basePriceUsd: 61200, topPriceUsd: 100495, turningRadiusFt: 19.6 },
  { make: "Toyota", model: "Sequoia", years: "2023-2025", category: "fullsize-suv", hp: 437, torqueLbFt: 583, zeroToSixty: 5.7, topSpeedMph: 112, curbWeightLbs: 5800, cargoCuFt: 11.5, cargoBehind2ndRowCuFt: 48.9, seating: 8, lengthIn: 208.1, widthIn: 81.6, heightIn: 75.0, wheelbaseIn: 122.0, basePriceUsd: 60995, topPriceUsd: 80570, turningRadiusFt: 20.7 },

  // ---- Off-road SUVs ----
  { make: "Jeep", model: "Wrangler", years: "2024-2025", category: "offroad-suv", hp: 285, torqueLbFt: 260, zeroToSixty: 6.9, topSpeedMph: 99, curbWeightLbs: 4145, cargoCuFt: 31.7, seating: 5, lengthIn: 166.8, widthIn: 73.8, heightIn: 73.6, wheelbaseIn: 96.8, basePriceUsd: 33290, topPriceUsd: 55000, turningRadiusFt: 20.6 },
  { make: "Ford", model: "Bronco", years: "2021-2025", category: "offroad-suv", hp: 300, torqueLbFt: 325, zeroToSixty: 6.2, topSpeedMph: 106, curbWeightLbs: 4400, cargoCuFt: 35.6, seating: 5, lengthIn: 173.7, widthIn: 75.9, heightIn: 71.9, wheelbaseIn: 100.4, basePriceUsd: 39130, topPriceUsd: 61180, turningRadiusFt: 22.3 },

  // ---- Luxury SUVs ----
  { make: "BMW", model: "X5", years: "2024-2025", category: "luxury-suv", hp: 375, torqueLbFt: 398, zeroToSixty: 5.3, topSpeedMph: 130, curbWeightLbs: 5145, cargoCuFt: 33.9, seating: 5, lengthIn: 194.3, widthIn: 78.9, heightIn: 68.7, wheelbaseIn: 117.1, basePriceUsd: 68900, topPriceUsd: 85000, turningRadiusFt: 19.6 },

  // ---- Minivans ----
  { make: "Honda", model: "Odyssey", years: "2011-2017", category: "minivan", hp: 248, torqueLbFt: 250, zeroToSixty: 7.5, topSpeedMph: 112, curbWeightLbs: 4451, cargoCuFt: 38.4, cargoBehind2ndRowCuFt: 93.1, seating: 8, lengthIn: 202.9, widthIn: 78.5, heightIn: 68.4, wheelbaseIn: 118.1, basePriceUsd: 28975, topPriceUsd: 44650, turningRadiusFt: 18.4 },
  { make: "Kia", model: "Carnival", years: "2022-2025", category: "minivan", hp: 290, torqueLbFt: 262, zeroToSixty: 7.4, topSpeedMph: 118, curbWeightLbs: 4392, cargoCuFt: 40.2, cargoBehind2ndRowCuFt: 86.9, seating: 8, lengthIn: 203.0, widthIn: 78.4, heightIn: 68.7, wheelbaseIn: 122.0, basePriceUsd: 34390, topPriceUsd: 47385, turningRadiusFt: 18.7 },

  // ---- Full-size trucks ----
  { make: "Ford", model: "F-150", years: "2021-2025", category: "fullsize-truck", hp: 325, torqueLbFt: 400, zeroToSixty: 6.9, topSpeedMph: 99, curbWeightLbs: 4705, cargoCuFt: 52.8, seating: 5, lengthIn: 231.7, widthIn: 79.9, heightIn: 75.6, wheelbaseIn: 145.4, basePriceUsd: 36570, topPriceUsd: 80700, turningRadiusFt: 23.9 },
  { make: "Chevrolet", model: "Silverado", years: "2022-2025", category: "fullsize-truck", hp: 355, torqueLbFt: 383, zeroToSixty: 6.7, topSpeedMph: 99, curbWeightLbs: 4844, cargoCuFt: 61.7, seating: 5, lengthIn: 231.7, widthIn: 81.2, heightIn: 75.5, wheelbaseIn: 147.4, basePriceUsd: 38395, topPriceUsd: 78300, turningRadiusFt: 24.5 },
  { make: "Ram", model: "1500", years: "2019-2025", category: "fullsize-truck", hp: 395, torqueLbFt: 410, zeroToSixty: 6.5, topSpeedMph: 99, curbWeightLbs: 5200, cargoCuFt: 53.4, seating: 5, lengthIn: 232.9, widthIn: 82.1, heightIn: 78.6, wheelbaseIn: 140.0, basePriceUsd: 39625, topPriceUsd: 78685, turningRadiusFt: 24.4 },
  { make: "Toyota", model: "Tundra", years: "2022-2025", category: "fullsize-truck", hp: 389, torqueLbFt: 479, zeroToSixty: 5.7, topSpeedMph: 99, curbWeightLbs: 5300, cargoCuFt: 47.9, seating: 5, lengthIn: 233.6, widthIn: 81.6, heightIn: 78.3, wheelbaseIn: 145.7, basePriceUsd: 40000, topPriceUsd: 78635, turningRadiusFt: 24.9 },
  { make: "GMC", model: "Sierra", years: "2022-2025", category: "fullsize-truck", hp: 355, torqueLbFt: 383, zeroToSixty: 6.6, topSpeedMph: 99, curbWeightLbs: 4945, cargoCuFt: 61.7, seating: 5, lengthIn: 231.7, widthIn: 81.2, heightIn: 75.8, wheelbaseIn: 147.5, basePriceUsd: 39200, topPriceUsd: 82395, turningRadiusFt: 24.5 },

  // ---- Midsize trucks ----
  { make: "Toyota", model: "Tacoma", years: "2024-2025", category: "midsize-truck", hp: 278, torqueLbFt: 317, zeroToSixty: 7.0, topSpeedMph: 106, curbWeightLbs: 4325, cargoCuFt: 41.5, seating: 5, lengthIn: 212.7, widthIn: 76.2, heightIn: 70.6, wheelbaseIn: 131.9, basePriceUsd: 31500, topPriceUsd: 53730, turningRadiusFt: 21.4 },

  // ---- Electric trucks ----
  { make: "Ford", model: "F-150 Lightning", years: "2022-2025", category: "ev-truck", hp: 452, torqueLbFt: 775, zeroToSixty: 4.5, topSpeedMph: 107, curbWeightLbs: 6015, cargoCuFt: 52.8, seating: 5, lengthIn: 232.7, widthIn: 83.6, heightIn: 78.3, wheelbaseIn: 145.5, basePriceUsd: 54995, topPriceUsd: 91500, turningRadiusFt: 24.4 },
  { make: "Tesla", model: "Cybertruck", years: "2024-2025", category: "ev-truck", hp: 600, torqueLbFt: 610, zeroToSixty: 4.1, topSpeedMph: 112, curbWeightLbs: 6603, cargoCuFt: 67.3, seating: 5, lengthIn: 223.7, widthIn: 79.8, heightIn: 70.5, wheelbaseIn: 149.9, basePriceUsd: 79990, topPriceUsd: 87990, turningRadiusFt: 22.6 },
  { make: "Rivian", model: "R1T", years: "2022-2025", category: "ev-truck", hp: 533, torqueLbFt: 610, zeroToSixty: 4.5, topSpeedMph: 108, curbWeightLbs: 6636, cargoCuFt: 74.4, seating: 5, lengthIn: 217.1, widthIn: 79.3, heightIn: 71.6, wheelbaseIn: 135.9, basePriceUsd: 69900, topPriceUsd: 92700, turningRadiusFt: 21.1 },

  // ---- Electric sedans ----
  { make: "Tesla", model: "Model 3", years: "2024-2025", category: "ev-sedan", hp: 283, torqueLbFt: 310, zeroToSixty: 5.8, topSpeedMph: 140, curbWeightLbs: 3891, cargoCuFt: 19.8, seating: 5, lengthIn: 185.0, widthIn: 72.8, heightIn: 56.8, wheelbaseIn: 113.2, basePriceUsd: 38990, topPriceUsd: 52990, turningRadiusFt: 19.4 },
  { make: "Tesla", model: "Model S", years: "2021-2025", category: "ev-sedan", hp: 670, torqueLbFt: 713, zeroToSixty: 3.1, topSpeedMph: 155, curbWeightLbs: 4561, cargoCuFt: 28.0, seating: 5, lengthIn: 197.7, widthIn: 77.3, heightIn: 56.9, wheelbaseIn: 116.5, basePriceUsd: 74990, topPriceUsd: 82000, turningRadiusFt: 20.1 },
  { make: "Hyundai", model: "Ioniq 6", years: "2023-2025", category: "ev-sedan", hp: 320, torqueLbFt: 446, zeroToSixty: 4.9, topSpeedMph: 115, curbWeightLbs: 4522, cargoCuFt: 11.2, seating: 5, lengthIn: 191.1, widthIn: 74.0, heightIn: 58.9, wheelbaseIn: 116.1, basePriceUsd: 38350, topPriceUsd: 53150, turningRadiusFt: 17.9 },

  // ---- Electric SUVs / hatchbacks ----
  { make: "Tesla", model: "Model Y", years: "2024-2025", category: "ev-suv", hp: 295, torqueLbFt: 331, zeroToSixty: 6.0, topSpeedMph: 135, curbWeightLbs: 4416, cargoCuFt: 34.3, seating: 5, lengthIn: 187.0, widthIn: 75.6, heightIn: 63.9, wheelbaseIn: 116.3, basePriceUsd: 44990, topPriceUsd: 54990, turningRadiusFt: 19.4 },
  { make: "Ford", model: "Mustang Mach-E", years: "2021-2025", category: "ev-suv", hp: 266, torqueLbFt: 317, zeroToSixty: 6.3, topSpeedMph: 112, curbWeightLbs: 4394, cargoCuFt: 29.7, seating: 5, lengthIn: 186.7, widthIn: 74.1, heightIn: 63.5, wheelbaseIn: 117.5, basePriceUsd: 39995, topPriceUsd: 54595, turningRadiusFt: 19.0 },
  { make: "Volkswagen", model: "ID.4", years: "2021-2025", category: "ev-suv", hp: 201, torqueLbFt: 229, zeroToSixty: 7.5, topSpeedMph: 99, curbWeightLbs: 4400, cargoCuFt: 30.3, seating: 5, lengthIn: 180.5, widthIn: 72.9, heightIn: 64.4, wheelbaseIn: 108.9, basePriceUsd: 39885, topPriceUsd: 48885, turningRadiusFt: 18.4 },
  { make: "Hyundai", model: "Ioniq 5", years: "2022-2025", category: "ev-suv", hp: 320, torqueLbFt: 446, zeroToSixty: 4.5, topSpeedMph: 115, curbWeightLbs: 4662, cargoCuFt: 27.2, seating: 5, lengthIn: 182.5, widthIn: 74.4, heightIn: 63.0, wheelbaseIn: 118.1, basePriceUsd: 42600, topPriceUsd: 56500, turningRadiusFt: 17.6 },
  { make: "Kia", model: "EV6", years: "2022-2025", category: "ev-suv", hp: 320, torqueLbFt: 446, zeroToSixty: 4.5, topSpeedMph: 117, curbWeightLbs: 4550, cargoCuFt: 24.4, seating: 5, lengthIn: 184.3, widthIn: 74.4, heightIn: 60.8, wheelbaseIn: 114.2, basePriceUsd: 42600, topPriceUsd: 61600, turningRadiusFt: 17.6 },
  { make: "Chevrolet", model: "Bolt EV", years: "2017-2023", category: "ev-hatchback", hp: 200, torqueLbFt: 266, zeroToSixty: 6.5, topSpeedMph: 93, curbWeightLbs: 3589, cargoCuFt: 16.6, seating: 5, lengthIn: 163.2, widthIn: 69.5, heightIn: 62.5, wheelbaseIn: 102.4, basePriceUsd: 26500, topPriceUsd: 29700, turningRadiusFt: 16.0 },

  // ---- Sports cars ----
  { make: "Ford", model: "Mustang", years: "2024-2025", category: "sports-car", hp: 315, torqueLbFt: 350, zeroToSixty: 5.5, topSpeedMph: 145, curbWeightLbs: 3705, cargoCuFt: 13.5, seating: 4, lengthIn: 189.4, widthIn: 75.4, heightIn: 54.3, wheelbaseIn: 107.1, basePriceUsd: 32515, topPriceUsd: 62995, turningRadiusFt: 18.7 },
  { make: "Chevrolet", model: "Camaro", years: "2016-2024", category: "sports-car", hp: 335, torqueLbFt: 284, zeroToSixty: 5.4, topSpeedMph: 155, curbWeightLbs: 3384, cargoCuFt: 9.1, seating: 4, lengthIn: 188.3, widthIn: 74.7, heightIn: 53.1, wheelbaseIn: 110.7, basePriceUsd: 26495, topPriceUsd: 38495, turningRadiusFt: 18.5 },
  { make: "Chevrolet", model: "Corvette", years: "2020-2025", category: "sports-car", hp: 495, torqueLbFt: 470, zeroToSixty: 2.9, topSpeedMph: 194, curbWeightLbs: 3366, cargoCuFt: 12.6, seating: 2, lengthIn: 182.3, widthIn: 76.5, heightIn: 48.6, wheelbaseIn: 107.2, basePriceUsd: 68300, topPriceUsd: 87000, turningRadiusFt: 20.1 },
  { make: "Dodge", model: "Challenger", years: "2015-2023", category: "sports-car", hp: 303, torqueLbFt: 268, zeroToSixty: 6.6, topSpeedMph: 130, curbWeightLbs: 3835, cargoCuFt: 16.2, seating: 5, lengthIn: 197.9, widthIn: 75.7, heightIn: 57.5, wheelbaseIn: 116.2, basePriceUsd: 32945, topPriceUsd: 43195, turningRadiusFt: 20.4 },
  { make: "Toyota", model: "GR 86", years: "2022-2025", category: "sports-car", hp: 228, torqueLbFt: 184, zeroToSixty: 6.1, topSpeedMph: 140, curbWeightLbs: 2811, cargoCuFt: 6.3, seating: 4, lengthIn: 167.9, widthIn: 69.9, heightIn: 51.6, wheelbaseIn: 101.4, basePriceUsd: 30300, topPriceUsd: 33635, turningRadiusFt: 17.8 },
  { make: "Subaru", model: "BRZ", years: "2022-2025", category: "sports-car", hp: 228, torqueLbFt: 184, zeroToSixty: 6.1, topSpeedMph: 140, curbWeightLbs: 2814, cargoCuFt: 6.3, seating: 4, lengthIn: 167.9, widthIn: 69.9, heightIn: 51.6, wheelbaseIn: 101.4, basePriceUsd: 30405, topPriceUsd: 34205, turningRadiusFt: 17.8 },
  { make: "Nissan", model: "Z", years: "2023-2025", category: "sports-car", hp: 400, torqueLbFt: 350, zeroToSixty: 4.5, topSpeedMph: 155, curbWeightLbs: 3486, cargoCuFt: 6.9, seating: 2, lengthIn: 172.4, widthIn: 72.6, heightIn: 51.8, wheelbaseIn: 100.4, basePriceUsd: 43190, topPriceUsd: 55650, turningRadiusFt: 18.0 },
  { make: "Porsche", model: "911 Carrera", years: "2020-2025", category: "sports-car", hp: 388, torqueLbFt: 331, zeroToSixty: 4.0, topSpeedMph: 182, curbWeightLbs: 3354, cargoCuFt: 4.6, seating: 4, lengthIn: 177.9, widthIn: 72.9, heightIn: 51.1, wheelbaseIn: 96.5, basePriceUsd: 121300, topPriceUsd: 137100, turningRadiusFt: 17.9 },
];

const CATEGORY_LABELS = {
  "compact-sedan": "Compact Sedan",
  "midsize-sedan": "Midsize Sedan",
  "luxury-sedan": "Luxury Sedan",
  "compact-suv": "Compact SUV",
  "subcompact-suv": "Subcompact SUV",
  "compact-hatchback": "Compact Hatchback",
  "midsize-suv": "Midsize SUV (2-Row)",
  "3row-suv": "3-Row SUV",
  "fullsize-suv": "Full-Size SUV",
  "offroad-suv": "Off-Road SUV",
  "luxury-suv": "Luxury SUV",
  "minivan": "Minivan",
  "fullsize-truck": "Full-Size Truck",
  "midsize-truck": "Midsize Truck",
  "ev-truck": "Electric Truck",
  "ev-sedan": "Electric Sedan",
  "ev-suv": "Electric SUV",
  "ev-hatchback": "Electric Hatchback",
  "sports-car": "Sports Car",
};

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
//
// The primary case is modelKey.includes(entryKey): the curated key
// ("mustang", "f150") is a prefix/substring of the fuller resolved model
// text ("mustang 4dr", "f150lightning4wder1"). Among those forward
// matches we pick the LONGEST curated key, since that's the more specific
// match -- e.g. "F-150 Lightning" should win over plain "F-150" for a
// Lightning model, but plain "F-150" must win for a gas F-150 (its longer
// sibling "F-150 Lightning" does NOT forward-match "f150pickup2wd", so it
// never even enters the running). Checking entryKey.includes(modelKey)
// as an equally-weighted alternative (as this used to) breaks that: it
// lets a longer sibling key "beat" an exact match just because the
// resolved text happens to be a prefix of that sibling's key -- e.g. a
// plain "Mustang" would wrongly match "Mustang Mach-E". So the reverse
// direction is only used as a fallback when nothing forward-matches.
function findReferenceSpecs(make, model) {
  const makeKey = normalizeKey(make);
  const modelKey = normalizeKey(model);
  if (!makeKey || !modelKey) return null;

  const candidates = CAR_REFERENCE_DATA.filter((e) => normalizeKey(e.make) === makeKey);

  const forward = candidates.filter((e) => modelKey.includes(normalizeKey(e.model)));
  if (forward.length) {
    forward.sort((a, b) => normalizeKey(b.model).length - normalizeKey(a.model).length);
    return forward[0];
  }

  const backward = candidates.filter((e) => normalizeKey(e.model).includes(modelKey));
  if (backward.length) {
    backward.sort((a, b) => normalizeKey(a.model).length - normalizeKey(b.model).length);
    return backward[0];
  }

  return null;
}

// Other curated cars in the same category (i.e. commonly cross-shopped),
// excluding the car itself and anything already listed in excludeKeys
// (each a normalized "make|model" string).
function suggestSimilarCars(make, model, excludeKeys, limit) {
  const self = findReferenceSpecs(make, model);
  if (!self || !self.category) return [];
  const selfKey = `${normalizeKey(self.make)}|${normalizeKey(self.model)}`;
  const exclude = new Set(excludeKeys || []);
  exclude.add(selfKey);
  return CAR_REFERENCE_DATA
    .filter((e) => e.category === self.category)
    .filter((e) => !exclude.has(`${normalizeKey(e.make)}|${normalizeKey(e.model)}`))
    .slice(0, limit || 4);
}

// Builds a YouTube search-results URL (not a specific video -- there's no
// free/keyless way to look up an exact matching review) for a resolved car.
function youtubeSearchUrl(year, make, model, extraTerms) {
  const query = [year, make, model, extraTerms, "review"].filter(Boolean).join(" ");
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
