import { OmitType } from "@nestjs/swagger";
import { ProgramDto } from "./program.dto";

export class ProgramCreateDto extends OmitType(ProgramDto, [
  "id",
  "specialty",
  "meta",
]) {
  public specialtyId!: string;
}
