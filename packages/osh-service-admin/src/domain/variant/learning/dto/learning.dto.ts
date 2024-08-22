import { ApiProperty } from "@nestjs/swagger";
import { LearningFileDto } from "./learning-file.dto";

export class LearningDto {
  public id!: string;
  public name!: string;
  public text?: string;

  @ApiProperty({ type: [LearningFileDto] })
  public files!: Iterable<LearningFileDto>;
}
