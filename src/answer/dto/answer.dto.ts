import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class getAnswerByQuestionDto {
  @IsNumber()
  @IsOptional()
  question_id?: number
}

export class createAnswerDto {
  
  @IsNumber()
  @IsNotEmpty()
  question_id: number

  @IsString()
  @IsNotEmpty()
  name: string
}

export class editAnswerDto {

  @IsNumber()
  @IsNotEmpty()
  question_id: number

  @IsString()
  @IsOptional()
  name?: string

  @IsBoolean()
  @IsOptional()
  is_correct?: boolean

}