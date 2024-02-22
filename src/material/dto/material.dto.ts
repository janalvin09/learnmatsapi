import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class getMaterialByClasslevelDto {
  @IsNumber()
  @IsOptional()
  classlevel_id?: number
}


export class createMaterialDto {
  
  @IsNumber()
  @IsNotEmpty()
  classlevel_id: number

  @IsString()
  @IsNotEmpty()
  name:string

  @IsString()
  @IsNotEmpty()
  material_icon:string

  @IsString()
  @IsNotEmpty()
  material_description:string
  
  @IsString()
  @IsNotEmpty()
  material_description_image:string
}

export class editMaterialDto {

  @IsNumber()
  @IsNotEmpty()
  classlevel_id: number

  @IsString()
  @IsOptional()
  name?:string

  @IsString()
  @IsOptional()
  material_icon?:string

  @IsString()
  @IsOptional()
  material_description?:string
  
  @IsString()
  @IsOptional()
  material_description_image?:string
}
