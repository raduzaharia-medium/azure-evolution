export const evolvePopulation = async () => {
  const request = await fetch("/api/evolve-population");
  const result = await request.json();

  return result;
};
