// Unit conversion helpers: US customary <-> metric.
const Units = {
  mpgToL100km(mpg) {
    if (!mpg || mpg <= 0) return null;
    return 235.214 / mpg;
  },
  hpToKw(hp) {
    if (hp == null) return null;
    return hp * 0.7457;
  },
  lbFtToNm(lbFt) {
    if (lbFt == null) return null;
    return lbFt * 1.35582;
  },
  mphToKmh(mph) {
    if (mph == null) return null;
    return mph * 1.60934;
  },
  lbsToKg(lbs) {
    if (lbs == null) return null;
    return lbs * 0.453592;
  },
  inToCm(inches) {
    if (inches == null) return null;
    return inches * 2.54;
  },
  ftToM(feet) {
    if (feet == null) return null;
    return feet * 0.3048;
  },
  cuFtToLiters(cuFt) {
    if (cuFt == null) return null;
    return cuFt * 28.3168;
  },
  gpmToGpkm(gpm) {
    if (gpm == null) return null;
    return gpm * 0.621371;
  },
  usdToLabel(usd) {
    if (usd == null) return null;
    return `$${usd.toLocaleString()}`;
  },
  fmt(n, decimals = 1) {
    if (n == null || Number.isNaN(n)) return null;
    return n.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: 0 });
  },
};
