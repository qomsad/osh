import { PartialType } from "@nestjs/swagger";
import { SpecialtyCreateDto } from "./specialty-create.dto";

export class SpecialtyUpdateDto extends PartialType(SpecialtyCreateDto) {}
