import { OmitType } from "@nestjs/swagger";
import { LearningFileDto } from "./learning-file.dto";

export class LearningFileCreateDto extends OmitType(LearningFileDto, ["id"]) {}
