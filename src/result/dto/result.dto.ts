import { IsNotEmpty, IsOptional, IsNumber } from "class-validator";


export class getResultByMatClasslevelDto {
  @IsNumber()
  @IsOptional()
  material_id?: number

  @IsNumber()
  @IsOptional()
  classlevel_id?: number
}


export class createResultDto {
  @IsNumber()
  @IsNotEmpty()
  material_id: number

  @IsNumber()
  @IsNotEmpty()
  classlevel_id: number

  @IsNumber()
  @IsNotEmpty()
  score_by_percentage: number

  @IsNumber()
  @IsNotEmpty()
  total_correct_answer: number

  @IsNumber()
  @IsNotEmpty()
  total_incorrect_answer: number
  
  @IsNumber()
  @IsNotEmpty()
  number_of_question: number
}

export class editResultDto {
  @IsNumber()
  @IsNotEmpty()
  material_id: number

  @IsNumber()
  @IsNotEmpty()
  classlevel_id: number

  @IsNumber()
  @IsOptional()
  score_by_percentage?: number

  @IsNumber()
  @IsOptional()
  total_correct_answer?: number

  @IsNumber()
  @IsOptional()
  total_incorrect_answer?: number
  
  @IsNumber()
  @IsOptional()
  number_of_question?: number
}