import { IsString, IsEmail } from "class-validator";

export class ExistingUserDto {
  @IsEmail()
  email: string

  @IsString()
  password: string
}