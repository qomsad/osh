import { MetaDto } from "../../../shared/embedded/dto/meta.dto";

export class VariantDto {
  public id!: string;
  public name!: string;
  public description?: string;
  public trainingDuration?: number;
  public learningDuration?: number;
  public trainingSuccessRate?: number;
  public meta!: MetaDto;
}
