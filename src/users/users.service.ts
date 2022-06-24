import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./Schemas/user.schema";

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  create(name: string, email: string, hashPassword: string){
    return this.usersRepo.create(name, email, hashPassword)
  }

  findAll() {
    return this.usersRepo.findAll()
  }

  findOne(id: string) {
    return this.usersRepo.findOne(id)
  }

  update(id: string, user: Partial<User>) {
    return this.usersRepo.update(id, user)
  }

  delete(id: string){
    return this.usersRepo.delete(id)
  }

  findByEmail(email: string) {
    return this.usersRepo.findByEmail(email)
  }
}