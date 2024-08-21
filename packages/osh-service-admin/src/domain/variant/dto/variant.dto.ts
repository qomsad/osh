import { MetaDto } from "../../../shared/embedded/dto/meta.dto";
import { LearningDto } from "../learning/dto/learning.dto";
import { TrainingDto } from "../training/dto/training.dto";

export class VariantDto {
  public id!: string;
  public name!: string;
  public description?: string;
  public learnings!: LearningDto[];
  public trainings!: TrainingDto[];
  public trainingDuration?: number;
  public learningDuration?: number;
  public trainingSuccessRate?: number;
  public meta!: MetaDto;
}
