import { ApiProperty } from "@nestjs/swagger";
import { LearningFileType } from "../entity/learning-file.entity";

export class LearningFileDto {
  public id!: string;
  public fid!: string;
  public type!: LearningFileType;
}

export class LearningDto {
  public id!: string;
  public name!: string;
  public text?: string;

  @ApiProperty({ type: [LearningFileDto] })
  public files!: Iterable<LearningFileDto>;
}
