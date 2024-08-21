import {
  Embedded,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Meta } from "../../../shared/embedded/model/meta.embeddable";
import { Specialty } from "../../specialty/entity/specialty.entity";

@Entity()
export class Specialist {
  @PrimaryKey({ type: "bigint", autoincrement: true })
  public id!: string;

  @Property({ type: "string", nullable: false, unique: true })
  public login!: string;

  @Property({ type: "string", nullable: false })
  public password!: string;

  @Property({ type: "string", nullable: false })
  public firstName!: string;

  @Property({ type: "string", nullable: true })
  public middleName?: string;

  @Property({ type: "string", nullable: false })
  public lastName!: string;

  @Property({ type: "string", nullable: true })
  public serviceNumber?: string;

  @ManyToOne({ entity: () => Specialty, nullable: false })
  public specialty!: Specialty;

  @Embedded(() => Meta)
  public meta!: Meta;
}
