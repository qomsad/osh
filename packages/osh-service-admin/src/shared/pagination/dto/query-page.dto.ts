export class QueryPageDto {
  public pageIndex: number = 1;
  public pageSize: number = 10;

  public search?: string = "";
}
