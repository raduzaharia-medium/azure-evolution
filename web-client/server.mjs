import Package from "../package.json" assert { type: "json" };
import Fastify from "fastify";

import fastifyStatic from "@fastify/static";
import replyFrom from "@fastify/reply-from";
import path from "path";

const fastify = Fastify({ logger: Package.config.logger });

fastify.register(fastifyStatic, {
  root: path.join(path.resolve("./web-client/public")),
  prefix: "/",
  index: "index.html",
});
fastify.register(replyFrom, {
  base: "http://127.0.0.1:7071/",
});

fastify.get("/api/evolve-population", async (request, reply) => {
  return await reply.from("/api/evolve-population");
});

fastify.listen({
  port: Package.config.port,
  hostname: Package.config.hostName,
});
