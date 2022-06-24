import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./Schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>){}

  async create(name: string, email: string, hashPassword: string) {
    const user = new this.userModel({name, email, password:hashPassword})
    const newUser = await user.save()
    return newUser
  }

  async findAll() {
    const users = await this.userModel.find().exec()
    return users
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec()
    return user
  }

  async update(id: string, user: Partial<User>) {
    const updatedUser = await this.userModel.findById(id)
    if (user.name) {
      updatedUser.name = user.name
    }
    if (user.email) {
      updatedUser.email = user.email
    }

    if (user.password) {
      updatedUser.password = user.password
    }

    updatedUser.save()
  }

  async delete(id: string) {
    const deletedUser = await this.userModel.findByIdAndRemove(id)
    return deletedUser
  }

  async findByEmail(email: string){
    const usersEmail = await this.userModel.find({email})
    return usersEmail.map((user) =>({id:user._id.toString(), name: user.name, email:user.email, password:user.password}))
  }
}