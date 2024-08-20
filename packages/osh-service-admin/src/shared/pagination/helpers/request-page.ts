import { QueryBuilder } from "@mikro-orm/postgresql";
import { PaginatedDto } from "../dto/paginated.dto";
import { QueryPageDto } from "../dto/query-page.dto";

export async function requestPage<T extends object>(
  qb: QueryBuilder<T>,
  query: QueryPageDto,
  searchableFields: (keyof T)[],
): Promise<PaginatedDto<T>> {
  if (query.search) {
    const searchConditions = searchableFields.map((field) => ({
      [field]: { $ilike: `%${query.search}%` },
    }));
    qb.andWhere({ $or: searchConditions });
  }

  const offset = (query.pageIndex - 1) * query.pageSize;
  qb.limit(query.pageSize).offset(offset);

  const [data, totalCount] = await qb.getResultAndCount();

  const pagesCount = Math.ceil(totalCount / query.pageSize);
  const hasPrev = query.pageIndex > 1;
  const hasNext = query.pageIndex < pagesCount;

  return {
    page: {
      pageIndex: query.pageIndex,
      pageSize: query.pageSize,
      totalCount,
      pagesCount,
      hasPrev,
      hasNext,
    },
    data,
  };
}
