import { Embeddable, Property } from "@mikro-orm/core";

@Embeddable()
export class Meta {
  @Property({ type: "datetime", nullable: false })
  public created: Date = new Date();

  @Property({ type: "datetime", nullable: false, onUpdate: () => new Date() })
  public updated: Date = new Date();
}
