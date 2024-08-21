import { LearningFileDto } from "./learning-file.dto";

export class LearningDto {
  public id!: string;
  public name!: string;
  public text?: string;
  public files!: LearningFileDto[];
}
