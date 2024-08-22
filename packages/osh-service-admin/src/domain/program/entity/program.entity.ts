import {
  Collection,
  Embedded,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Meta } from "../../../shared/embedded/model/meta.embeddable";
import { Specialty } from "../../specialty/entity/specialty.entity";
import { Variant } from "../../variant/entity/variant.entity";

@Entity()
export class Program {
  @PrimaryKey({ type: "bigint", autoincrement: true })
  public id!: string;

  @Property({ type: "text", nullable: false })
  public name!: string;

  @Property({ type: "text", nullable: true })
  public description?: string;

  @ManyToOne({ entity: () => Specialty, nullable: false })
  public specialty!: Specialty;

  @OneToMany({ entity: () => Variant, mappedBy: (e) => e.program })
  public variants = new Collection<Variant>(this);

  @Embedded(() => Meta)
  public meta!: Meta;
}
