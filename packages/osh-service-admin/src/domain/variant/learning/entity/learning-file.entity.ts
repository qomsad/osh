import { Entity, Enum, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Learning } from "./learning.entity";

@Entity()
export class LearningFile {
  @PrimaryKey({ type: "bigint", autoincrement: true })
  public id!: string;

  @Property({ type: "string", nullable: false })
  public fid!: string;

  @Enum({ items: () => LearningFileType, type: "string", nullable: false })
  public type!: LearningFileType;

  @ManyToOne({ entity: () => Learning, nullable: false })
  public learning!: Learning;
}

export enum LearningFileType {
  PDF = "pdf",
}
