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
import { ClasslevelService } from './classlevel.service';
import { CreateClasslevelDto, EditClasslevelDto } from './dto';

@UseGuards(JwtGuard)
@Controller('classlevel')
export class ClasslevelController {
  constructor(private classlevelService: ClasslevelService) {}

  @Get('all')
  getClassLevel() {
    return this.classlevelService.getClassLevel()
  }

  @Get(':id')
  getClassLevelbyId(
    @Param('id', ParseIntPipe) classlevel_id: number 
  ) {
    return this.classlevelService.getClassLevelById(classlevel_id)
  }

  @Post('create')
  createClassLevel(
    @Body() dto: CreateClasslevelDto
  ) {
    return this.classlevelService.createClassLevel(dto)
  }

  @Patch(':id')
  editClassLevelById(
    @Param('id', ParseIntPipe) classlevel_id: number,
    @Body() dto: EditClasslevelDto
  ) {
    return this.classlevelService.editClassLevelById(classlevel_id, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteClassLevelById(
    @Param('id', ParseIntPipe) classlevel_id: number
  ) {
    return this.classlevelService.deleteClassLevelById(classlevel_id)
  }

}
