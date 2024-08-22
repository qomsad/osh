import { ApiProperty, OmitType } from "@nestjs/swagger";
import { LearningDto, LearningFileDto } from "./learning.dto";

export class LearningFileCreateDto extends OmitType(LearningFileDto, ["id"]) {}

export class LearningCreateDto extends OmitType(LearningDto, ["id", "files"]) {
  @ApiProperty({ type: [LearningFileCreateDto] })
  files!: Iterable<LearningFileCreateDto>;
}
