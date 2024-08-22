import { IntersectionType } from "@nestjs/swagger";
import { QueryPageDto } from "../../../shared/pagination/dto/query-page.dto";

class ProgramQuery {
  programId?: string;
}

export class VariantQueryPageDto extends IntersectionType(
  QueryPageDto,
  ProgramQuery,
) {}
