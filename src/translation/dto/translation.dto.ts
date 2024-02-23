import { IsNotEmpty, IsOptional, IsNumber, IsString } from "class-validator";

export class getTranslationByLanguageDto {
  @IsNumber()
  @IsOptional()
  language_id?: number
}

export class createTranslationDto {
  @IsNumber()
  @IsNotEmpty()
  language_id: number

  @IsString()
  @IsNotEmpty()
  word: string

  @IsString()
  @IsNotEmpty()
  translation: string
}

export class editTranslationDto {
  @IsNumber()
  @IsNotEmpty()
  language_id: number

  @IsString()
  @IsOptional()
  word?: string

  @IsString()
  @IsOptional()
  translation?: string
}
