import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type UserDocument = User & mongoose.Document

@Schema()
export class User {
  @Prop()
  name: string

  @Prop()
  email: string

  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)