import { MetaDto } from "../../../shared/embedded/dto/meta.dto";

export class SpecialtyDto {
  public id!: string;
  public name!: string;
  public description?: string;
  public meta!: MetaDto;
}
