export const memoize = (func) => {
  const cache = {};

  return (...args) => {
    const key = JSON.stringify(args);

    if (!cache[key]) cache[key] = func(...args);
    return cache[key];
  };
};

export const same = (a, b) =>
  !a || !b ? false : a.every((v, i) => v === b[i]);

export const roundAll = (array) => array.map((e) => e.toFixed(2));