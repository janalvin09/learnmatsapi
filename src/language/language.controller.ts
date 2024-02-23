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
import { LanguageService } from './language.service';
import { createLanguageDto, editLanguageDto } from './dto';

@UseGuards(JwtGuard)
@Controller('language')
export class LanguageController {
  constructor(private languageService: LanguageService) {}

  @Get('get-languages')
  getLanguages() {
    return this.languageService.getLanguages()
  }
  
  @Get(':id')
  getLanguagesById(
    @Param('id', ParseIntPipe) language_id: number 
  ) {
    return this.languageService.getLanguagesById(language_id)

  }

  @Post('create')
  createLanguage(
    @Body() dto: createLanguageDto
  ) {
    return this.languageService.createLanguage(dto)

  }
  
  @Patch(':id')
  editLanguageById(
    @Param('id', ParseIntPipe) language_id: number,
    @Body() dto: editLanguageDto
  ) {
    return this.languageService.editLanguageById(language_id, dto)

  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteLanguageById(
    @Param('id', ParseIntPipe) language_id: number
  ) {
    return this.languageService.deleteLanguageById(language_id)
  }

}
