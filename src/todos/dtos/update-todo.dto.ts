import { IsString } from "class-validator";

export class UpdateTodoDto {

  @IsString()
  todo: string

}