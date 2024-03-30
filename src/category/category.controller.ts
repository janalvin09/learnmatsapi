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
import { CategoryService } from './category.service';
import { getCategoryByClasslevelDto, createCategoryDto, editCategoryDto } from './dto'

@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('get-categories')
  getCategories (
    @Body() dto?: getCategoryByClasslevelDto
  ) {
    
    if(dto) {
      return this.categoryService.getCategories(dto)
    }
    return this.categoryService.getCategories()
  }

  @Get(':id')
  getCategoryById (
    @Param('id', ParseIntPipe) category_id: number
  ) {
    return this.categoryService.getCategoryById(category_id)
  }

  @Post('create')
  createCategory(
    @Body() dto: createCategoryDto
  ) {
    return this.categoryService.createCategory(dto)
  }

  @Patch(':id')
  editCategoryById(
    @Param('id', ParseIntPipe) category_id: number,
    @Body() dto: editCategoryDto
  ) {
    return this.categoryService.editCategoryById(category_id, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCategoryById(
    @Param('id', ParseIntPipe) category_id: number
  ) {
    return this.categoryService.deleteCategoryById(category_id)
  }
}
