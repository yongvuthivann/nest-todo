import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { ExistingUserDto } from "../users/dtos/existing-user.dto";


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  async register(name: string, email: string, password: string): Promise<CreateUserDto>{
    const user = await this.usersService.findByEmail(email)

    if (user.length) throw new BadRequestException("Email in used.")

    const hashedPassword = await this.hashPassword(password)
    const result = this.usersService.create(name, email, hashedPassword)
    return result
  }

  async doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hashedPassword)
    return result
  }

  async validateUser(email:string, password:string) {
    const [user] = await this.usersService.findByEmail(email)
    const doesUserExist = user

    if (!doesUserExist) return null

    const doesPasswordMatch = await this.doesPasswordMatch(password, user.password)
    if (!doesPasswordMatch) throw new BadRequestException('Incorrect credential')

    return user
  }

  async login(existingUser: ExistingUserDto): Promise<string>{
    const { email, password } = existingUser
    const user = await this.validateUser(email, password)

    if (!user) throw new NotFoundException('User not found')

    const jwt = await this.jwtService.signAsync({user})
    return jwt
  }


}