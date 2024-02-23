import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";


export class getQuestionByMatClasslevelDto {

  @IsNumber()
  @IsOptional()
  material_id?: number

  @IsNumber()
  @IsOptional()
  classlevel_id?: number
}

export class createQuestionDto {

  @IsNumber()
  @IsNotEmpty()
  material_id: number

  @IsNumber()
  @IsNotEmpty()
  classlevel_id: number

  @IsString()
  @IsNotEmpty()
  name: string

}

export class editQuestionDto {

  @IsNumber()
  @IsNotEmpty()
  material_id: number

  @IsNumber()
  @IsNotEmpty()
  classlevel_id: number

  @IsString()
  @IsOptional()
  name?: string
}