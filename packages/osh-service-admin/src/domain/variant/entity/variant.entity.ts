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
import { Program } from "../../program/entity/program.entity";
import { Learning } from "../learning/entity/learning.entity";
import { Training } from "../training/entity/training.entity";

@Entity()
export class Variant {
  @PrimaryKey({ type: "bigint", autoincrement: true })
  public id!: string;

  @Property({ type: "text", nullable: false })
  public name!: string;

  @Property({ type: "text", nullable: true })
  public description?: string;

  @OneToMany(() => Learning, (learning) => learning.variant)
  public learnings = new Collection<Learning>(this);

  @OneToMany(() => Training, (training) => training.variant)
  public trainings = new Collection<Training>(this);

  @Property({ type: "int", nullable: false })
  public trainingDuration?: number;

  @Property({ type: "int", nullable: false })
  public learningDuration?: number;

  @Property({ type: "decimal", nullable: false, precision: 2 })
  public trainingSuccessRate?: number;

  @ManyToOne({ entity: () => Program, nullable: false })
  public program!: string;

  @Embedded(() => Meta)
  public meta!: Meta;
}
