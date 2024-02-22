import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpCode, 
  HttpStatus, 
  Param, 
  ParseIntPipe, 
  Patch, 
  Post, 
  UseGuards 
} from '@nestjs/common';
import { JwtGuard } from '@src/auth/guard';
import { MaterialService } from './material.service';
import { getMaterialByClasslevelDto, createMaterialDto, editMaterialDto} from './dto';

@UseGuards(JwtGuard)
@Controller('material')
export class MaterialController {
  constructor(private materialService: MaterialService) {}

  @Get('get-materials')
  getMaterial (
    @Body() dto?: getMaterialByClasslevelDto
  ) {
    
    if(dto) {
      return this.materialService.getMaterials(dto)
    }
    return this.materialService.getMaterials()
  }

  @Get(':id')
  getMaterialById (
    @Param('id', ParseIntPipe) material_id: number
  ) {
    return this.materialService.getMaterialById(material_id)
  }

  @Post('create')
  createMaterial(
    @Body() dto: createMaterialDto
  ) {
    return this.materialService.createMaterial(dto)
  }

  @Patch(':id')
  editMaterialById(
    @Param('id', ParseIntPipe) material_id: number,
    @Body() dto: editMaterialDto
  ) {
    return this.materialService.editMaterialById(material_id, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteMaterialById(
    @Param('id', ParseIntPipe) material_id: number
  ) {
    return this.materialService.deleteMaterialById(material_id)
  }
}
