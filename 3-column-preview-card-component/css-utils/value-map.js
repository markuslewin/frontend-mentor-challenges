function valueMap(object, f) {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      return [key, f(value)];
    })
  );
}

module.exports = valueMap;
