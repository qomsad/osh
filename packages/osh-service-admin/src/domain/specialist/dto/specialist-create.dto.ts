import { OmitType } from "@nestjs/swagger";
import { SpecialistDto } from "./specialist.dto";

export class SpecialistCreateDto extends OmitType(SpecialistDto, [
  "id",
  "meta",
  "specialty",
]) {
  public specialtyId!: string;
}
