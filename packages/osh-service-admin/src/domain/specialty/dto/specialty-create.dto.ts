import { OmitType } from "@nestjs/swagger";
import { SpecialtyDto } from "./specialty.dto";

export class SpecialtyCreateDto extends OmitType(SpecialtyDto, [
  "id",
  "meta",
]) {}
