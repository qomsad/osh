import { LearningFileType } from "../entity/learning-file.entity";

export class LearningFileDto {
  public id!: string;
  public fid!: string;
  public type!: LearningFileType;
}
