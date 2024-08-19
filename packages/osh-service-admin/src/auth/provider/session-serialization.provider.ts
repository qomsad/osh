import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserDto } from "../dto/user.dto";

@Injectable()
export class SessionSerializationProvider extends PassportSerializer {
  serializeUser(
    user: UserDto,
    done: (err: Error | null, user: UserDto) => void,
  ) {
    done(null, user);
  }

  deserializeUser(
    payload: UserDto,
    done: (err: Error | null, user: UserDto) => void,
  ) {
    done(null, payload);
  }
}
