import { OmitType } from "@nestjs/swagger";
import { LearningDto } from "./learning.dto";

export class LearningCreateDto extends OmitType(LearningDto, ["id"]) {}
