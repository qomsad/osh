import { Embedded, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Meta } from "../../../shared/embedded/model/meta.embeddable";

@Entity()
export class Specialty {
  @PrimaryKey({ type: "bigint", autoincrement: true })
  public id!: string;

  @Property({ type: "string", nullable: false })
  public name!: string;

  @Property({ type: "string", nullable: true })
  public description?: string;

  @Embedded(() => Meta)
  public meta!: Meta;
}
