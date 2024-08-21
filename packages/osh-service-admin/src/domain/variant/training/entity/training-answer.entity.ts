import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Training } from "./training.entity";

@Entity()
export class TrainingAnswer {
  @PrimaryKey({ type: "bigint", autoincrement: true })
  public id!: string;

  @Property({ type: "int", nullable: false })
  public index!: number;

  @Property({ type: "text", nullable: false })
  public answer!: string;

  @Property({ type: "bool", nullable: false })
  public isRight!: boolean;

  @ManyToOne({ entity: () => Training, nullable: false })
  public training!: Training;
}
