import { createRandomMatrix } from "./random.mjs";
import { nextGeneration } from "./evolution.mjs";
import { fitness, pickBest } from "./operations.mjs";
import { same, roundAll } from "./tools.mjs";

let populationSize = 5000;
let individualLength = 20;
let mutationProbability = 0.4;
let worker = work(populationSize, individualLength, mutationProbability);
let lastResult = undefined;

export default async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const requestPopulationSize = req.query.populationSize || 5000;
  const requestIndividualLength = req.query.individualLength || 20;
  const requestMutationProbability = req.query.mutationProbability || 0.4;
  const requestIterationCount = req.query.iterationCount || 1;

  if (
    requestPopulationSize !== populationSize ||
    requestIndividualLength !== individualLength ||
    requestMutationProbability !== mutationProbability
  ) {
    populationSize = requestPopulationSize;
    individualLength = requestIndividualLength;
    mutationProbability = requestMutationProbability;
    worker = work(populationSize, individualLength, mutationProbability);
  }

  for (let i = 0; i < requestIterationCount; i++) {
    const responseMessage = worker.next();

    if (responseMessage.value) lastResult = responseMessage;
    else if (responseMessage.done) lastResult.done = true;
  }

  context.res = {
    status: 200,
    body: {
      data: roundAll(lastResult.value),
      done: lastResult.done,
      fitness: fitness(lastResult.value).toFixed(2),
    },
  };
}

function* work(populationSize, individualLength, mutationProbability) {
  let population = createRandomMatrix(populationSize, individualLength);
  let bestFitnessAchieved = false;
  let previousBest = null;

  while (!bestFitnessAchieved) {
    population = nextGeneration(population, mutationProbability);

    const best = pickBest(...population);
    const bestFitness = fitness(best);

    if (bestFitness.toFixed(2) == 0.0) bestFitnessAchieved = true;

    if (!same(previousBest, best)) {
      previousBest = best;
      yield best;
    }
  }
}
