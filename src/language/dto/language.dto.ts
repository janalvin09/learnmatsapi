import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createLanguageDto {
  @IsString()
  @IsNotEmpty()
  lang_code: string

  @IsString()
  @IsNotEmpty()
  name: string
}

export class editLanguageDto {
  @IsString()
  @IsOptional()
  lang_code?: string

  @IsString()
  @IsOptional()
  name?: string
}