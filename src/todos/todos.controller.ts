import { Controller, Param, Patch, Delete, Get, Post, Body, UseGuards } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { UpdateTodoDto } from "./dtos/update-todo.dto";
import { JwtGuard } from "../auth/Guards/jwt.guard";


@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Post('create')
  async createTodo(@Body() data: CreateTodoDto): Promise<CreateTodoDto> {
    const todo = await this.todosService.create(data)
    return todo
  }

  @Get()
  async getTodos(): Promise<CreateTodoDto>{
    const todos = await this.todosService.findAll()
    return todos
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getTodo(@Param('id') id: string): Promise<CreateTodoDto>{
    const todo = await this.todosService.findOne(id)
    return todo
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() data: UpdateTodoDto
  ): Promise<UpdateTodoDto> {
    const updatedTodo = await this.todosService.update(id, data)
    return updatedTodo
  }

  @Delete(':id')
  async deleteDto(@Param('id') id:string): Promise<CreateTodoDto> {
    const deletedTodo = await this.todosService.delete(id)
    return deletedTodo
  }
}