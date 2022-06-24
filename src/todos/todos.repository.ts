import { Injectable } from '@nestjs/common'
import { InjectModel } from "@nestjs/mongoose";
import { Todo, TodoDocument } from "./schemas/todo.schema";
import { Model } from "mongoose";
import { CreateTodoDto } from "./dtos/create-todo.dto";

@Injectable()
export class TodosRepository {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: CreateTodoDto): Promise<CreateTodoDto>{
    const todo = new this.todoModel(createTodoDto)
    const newTodo = await todo.save()
    return newTodo
  }

  async findAll(): Promise<any> {
    const todos = await this.todoModel.find().exec()
    return todos
  }

  async findOne(id: string){
    const todo = await this.todoModel.findById(id).exec()
    return todo
  }

  async update(id: string, todo: Partial<Todo>) {
    const updateTodo = await this.todoModel.findById(id)
    if (todo.todo) {
      updateTodo.todo = todo.todo
    }
    updateTodo.save()
    return updateTodo
  }


  async delete(id: string) {
    const todo = await this.todoModel.findByIdAndRemove(id)
    return todo
  }
}