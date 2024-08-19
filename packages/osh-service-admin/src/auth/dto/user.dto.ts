export class UserDto {
  public sub!: string;
  public tokenId?: string;
  public username?: string;
  public email?: string;
  public firstName?: string;
  public middleName?: string;
  public lastName?: string;
  public roles!: string[];
}
