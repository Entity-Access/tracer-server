import { availableParallelism } from "node:os";


const isTestMode = (process.env.LOGGER_SERVER_TEST_MODE ?? "false") === "true";

export const globalEnv = {
    host: process.env.TRACER_HOST,
    port: Number(process.env.PORT ?? 8080),
    isTestMode,
    ssl: {
        emailAddress: process.env["TRACER_SSL_LE_EMAIL"] ?? "someone@somewhere",
        acme: {
            mode: process.env["TRACER_SSL_MODE"] as "self-signed" | "production" | "staging",
            endPoint: process.env["TRACER_SSL_ACME_EP"],
            eabKid: process.env["TRACER_SSL_ACME_EAB_KID"],
            eabHmac: process.env["TRACER_SSL_ACME_EAB_HMAC"],
        }
    },
    db: {
        database: process.env["TRACER_DB_DATABASE"] ?? "Tracer",
        host: process.env["TRACER_DB_HOST"] ?? "localhost",
        port: Number(process.env["TRACER_DB_PORT"] ?? 5432),
        ssl: JSON.parse(process.env["TRACER_DB_SSL"] ?? "true"),
        user: process.env["TRACER_DB_USER"] ?? "postgres",
        password: process.env["TRACER_DB_PASSWORD"] ?? "abcd123",
    },
    numCPUs: isTestMode
        ? 2
        : (process.env.TRACER_CLUSTER_WORKERS
            ? Number(process.env.TRACER_CLUSTER_WORKERS)
            : availableParallelism())
};
