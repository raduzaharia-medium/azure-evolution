import { memoize } from "./tools.mjs";

export const crossover = (parent1, parent2, crossPoint) => [
  ...parent1.slice(0, crossPoint),
  ...parent2.slice(crossPoint, parent2.length),
];

export const mutate = (individual, probability) =>
  individual.map((e) =>
    Math.random() < probability ? e * Math.random() + Math.random() : e
  );

export const fitness = memoize((individual) => {
  const sum = individual.reduceRight((result, e, index) => result + e, 0);
  return Math.abs(sum - 50);
});

export const pickBest = (...args) =>
  args.reduceRight(
    (result, e) => (fitness(result) < fitness(e) ? result : e),
    args[0]
  );
