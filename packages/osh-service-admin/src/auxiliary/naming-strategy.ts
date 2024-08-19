import { UnderscoreNamingStrategy } from "@mikro-orm/core";

export class NamingStrategy extends UnderscoreNamingStrategy {
  override indexName(
    tableName: string,
    columns: string[],
    type: "primary" | "foreign" | "unique" | "index" | "sequence" | "check",
  ): string {
    var tables = (type: string) => `${type}_${tableName}__${columns.join("_")}`;

    switch (type) {
      case "primary":
        return tables("pk");
      case "foreign":
        return tables("fk");
      case "unique":
        return tables("un");
      case "index":
        return tables("idx");
      case "sequence":
        return tables("seq");
    }

    return super.indexName(tableName, columns, type);
  }
}
