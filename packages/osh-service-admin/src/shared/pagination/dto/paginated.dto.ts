export class PaginatedDto<T> {
  public page!: Page;
  public data!: T[];
}

export class Page {
  public pageIndex!: number;
  public pageSize!: number;

  public totalCount!: number;
  public pagesCount!: number;

  public hasPrev!: boolean;
  public hasNext!: boolean;
}
