import { OmitType } from "@nestjs/swagger";
import { TrainingAnswerDto } from "./training-answer.dto";

export class TrainingAnswerCreateDto extends OmitType(TrainingAnswerDto, [
  "id",
]) {}
