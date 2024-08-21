import { IntersectionType } from "@nestjs/swagger";
import { QueryPageDto } from "../../../shared/pagination/dto/query-page.dto";

class SpecialtyQuery {
  specialtyId?: string;
}

export class SpecialistQueryPageDto extends IntersectionType(
  QueryPageDto,
  SpecialtyQuery,
) {}
