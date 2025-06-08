export const pick = (object, keys) => {
  return keys.reduce((result, key) => {
    if (object && Object.hasOwn(object, key)) {
      result[key] = object[key];
    }
    return result;
  }, {});
};
