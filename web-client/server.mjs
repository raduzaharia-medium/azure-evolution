import Package from "./package.json" assert { type: "json" };
import Fastify from "fastify";

import fastifyStatic from "@fastify/static";
import path from "path";

const fastify = Fastify({ logger: Package.config.logger });

fastify.register(fastifyStatic, {
  root: path.join(path.resolve("public")),
  prefix: "/",
  index: "index.html",
});

fastify.get("/api/hello-world", async (request, reply) => {
  reply.code(200).type("application/json").send({ hello: "world" });
});

fastify.listen({
  port: Package.config.port,
  hostname: Package.config.hostName,
});
