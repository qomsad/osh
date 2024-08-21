import { IntersectionType } from "@nestjs/swagger";
import { QueryPageDto } from "../../../shared/pagination/dto/query-page.dto";

class ProgramQuery {
  specialtyId?: string;
}

export class ProgramQueryPageDto extends IntersectionType(
  QueryPageDto,
  ProgramQuery,
) {}
