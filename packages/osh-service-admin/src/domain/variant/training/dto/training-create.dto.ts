import { ApiProperty, OmitType } from "@nestjs/swagger";
import { TrainingAnswerDto, TrainingDto } from "./training.dto";

export class TrainingAnswerCreateDto extends OmitType(TrainingAnswerDto, [
  "id",
]) {}

export class TrainingCreateDto extends OmitType(TrainingDto, [
  "id",
  "answers",
]) {
  @ApiProperty({ type: [TrainingAnswerCreateDto] })
  answers!: Iterable<TrainingAnswerDto>;
}
