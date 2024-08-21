import { PartialType } from "@nestjs/swagger";
import { SpecialistCreateDto } from "./specialist-create.dto";

export class SpecialistUpdateDto extends PartialType(SpecialistCreateDto) {}
