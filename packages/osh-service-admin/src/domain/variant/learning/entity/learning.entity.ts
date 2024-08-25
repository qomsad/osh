import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Variant } from "../../entity/variant.entity";
import { LearningFile } from "./learning-file.entity";

@Entity()
export class Learning {
  @PrimaryKey({ type: "bigint", autoincrement: true })
  public id!: string;

  @Property({ type: "text", nullable: false })
  public name!: string;

  @Property({ type: "text", nullable: true })
  public text?: string;

  @OneToMany({
    entity: () => LearningFile,
    mappedBy: (e) => e.learning,
    orphanRemoval: true,
    cascade: [Cascade.ALL],
  })
  public files = new Collection<LearningFile>(this);

  @ManyToOne({ entity: () => Variant, nullable: false })
  public variant!: Variant;
}
