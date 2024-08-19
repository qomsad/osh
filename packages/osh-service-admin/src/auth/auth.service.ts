import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class AuthService {
  public async validate(user: UserDto) {
    if (!user.roles?.includes("admin")) {
      throw new UnauthorizedException(
        "Не найден пользователь с подходящей ролью",
      );
    }
    return user;
  }
}
