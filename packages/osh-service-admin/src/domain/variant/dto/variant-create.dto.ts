import { OmitType } from "@nestjs/swagger";
import { VariantDto } from "./variant.dto";

export class VariantCreateDto extends OmitType(VariantDto, ["id", "meta"]) {
  public programId!: string;
}
