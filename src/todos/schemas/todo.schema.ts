import { SchemaFactory, Prop, Schema } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type TodoDocument = Todo & mongoose.Document

@Schema()
export class Todo {
  @Prop()
  todo: string
}

export const TodoSchema = SchemaFactory.createForClass(Todo)