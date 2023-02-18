export const pickRandomNumber = (max) => Math.round(Math.random() * max);

export const createRandomArray = (length) =>
  [...new Array(length)].map(() => Math.random());

export const createRandomMatrix = (length, width) =>
  [...new Array(length)].map(() => createRandomArray(width));