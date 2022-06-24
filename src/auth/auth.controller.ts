import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "../users/dtos/user.dto";
import { ExistingUserDto } from "../users/dtos/existing-user.dto";

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    const createUser = await this.authService.register(
      user.name,
      user.email,
      user.password
    )
    return createUser
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: ExistingUserDto) {
    const result = await this.authService.login(user)
    return result
  }
}