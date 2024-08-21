import { MetaDto } from "../../../shared/embedded/dto/meta.dto";
import { SpecialtyDto } from "../../specialty/dto/specialty.dto";

export class SpecialistDto {
  public id!: string;
  public login!: string;
  public password!: string;
  public firstName!: string;
  public middleName?: string;
  public lastName!: string;
  public serviceNumber?: string;
  public specialty!: SpecialtyDto;
  public meta!: MetaDto;
}
