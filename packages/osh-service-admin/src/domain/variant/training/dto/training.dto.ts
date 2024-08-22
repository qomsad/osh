import { ApiProperty } from "@nestjs/swagger";
import { TrainingAnswer } from "../entity/training-answer.entity";
import { TrainingQuestionType } from "../entity/training.entity";

export class TrainingDto {
  public id!: string;
  public type!: TrainingQuestionType;
  public question!: string;

  @ApiProperty({ type: [TrainingAnswer] })
  public answers!: Iterable<TrainingAnswer>;
}
