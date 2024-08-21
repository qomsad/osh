import {
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Variant } from "../../entity/variant.entity";
import { TrainingAnswer } from "./training-answer.entity";

@Entity()
export class Training {
  @PrimaryKey({ type: "bigint", autoincrement: true })
  public id!: string;

  @Enum({ items: () => TrainingQuestionType, type: "string", nullable: false })
  public type!: TrainingQuestionType;

  @Property({ type: "text", nullable: false })
  public question!: string;

  @OneToMany(() => TrainingAnswer, (trainingAnswer) => trainingAnswer.training)
  public answers = new Collection<TrainingAnswer>(this);

  @ManyToOne({ entity: () => Variant, nullable: false })
  public variant!: Variant;
}

export enum TrainingQuestionType {
  SINGLE = "single",
  MULTIPLY = "multiply",
}
