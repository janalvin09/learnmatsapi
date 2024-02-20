import { IsNotEmpty, IsString } from "class-validator";

export class CreateClasslevelDto {
  @IsString()
  @IsNotEmpty()
  name: string
}

export class EditClasslevelDto {
  @IsString()
  @IsNotEmpty()
  name: string
}