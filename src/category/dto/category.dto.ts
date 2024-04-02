import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class getCategoryByClasslevelDto {
  @IsNumber()
  @IsOptional()
  classlevel_id?: number
}

export class createCategoryDto {
  
  @IsNumber()
  @IsNotEmpty()
  classlevel_id: number

  @IsString()
  @IsNotEmpty()
  name:string
}

export class editCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  classlevel_id: number

  @IsString()
  @IsOptional()
  name?:string
}
