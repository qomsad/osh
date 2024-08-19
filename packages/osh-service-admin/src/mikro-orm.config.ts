import { defineConfig } from "@mikro-orm/core";
import { Migrator } from "@mikro-orm/migrations";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { NamingStrategy } from "./auxiliary/naming-strategy";

import "dotenv/config";

export default defineConfig({
  driver: PostgreSqlDriver,

  host: process.env["POSTGRES_HOST"],
  port: Number.parseInt(process.env["POSTGRES_PORT"] ?? "5432"),
  dbName: process.env["POSTGRES_DATABASE"],
  user: process.env["POSTGRES_USERNAME"],
  password: process.env["POSTGRES_PASSWORD"],
  schema: process.env["POSTGRES_SCHEMA"],

  entities: ["dist/**/*.entity.js", "dist/**/*.embeddable.js"],
  namingStrategy: NamingStrategy,

  debug: process.env["NODE_ENV"] === "development",
  highlighter:
    process.env["NODE_ENV"] === "development"
      ? new SqlHighlighter()
      : undefined,

  extensions: [Migrator],
});
