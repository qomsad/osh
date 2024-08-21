import { MetaDto } from "../../../shared/embedded/dto/meta.dto";
import { SpecialtyDto } from "../../specialty/dto/specialty.dto";

export class ProgramDto {
  public id!: string;
  public name!: string;
  public description?: string;
  public specialty!: SpecialtyDto;
  public meta!: MetaDto;
}
