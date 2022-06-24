import { Injectable } from '@nestjs/common'
import { TodosRepository } from "./todos.repository";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { UpdateTodoDto } from "./dtos/update-todo.dto";

@Injectable()
export class TodosService {
  constructor(private todosRepo: TodosRepository) {}

  create(createTodoDto: CreateTodoDto) {
    return this.todosRepo.create(createTodoDto)
  }

  findAll() {
    return this.todosRepo.findAll()
  }

  findOne(id: string){
    return this.todosRepo.findOne(id)
  }

  update(id:string, upadteTodo: Partial<UpdateTodoDto>) {
    return this.todosRepo.update(id, upadteTodo)
  }

  delete(id: string){
    return this.todosRepo.delete(id)
  }
}