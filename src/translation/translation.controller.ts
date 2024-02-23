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
import { TranslationService } from './translation.service';
import { createTranslationDto, editTranslationDto, getTranslationByLanguageDto } from './dto';

@UseGuards(JwtGuard)
@Controller('translation')
export class TranslationController {
  constructor(private translationService:TranslationService) {}

  @Get('get-translations')
  getTranslations(
    @Body() dto?: getTranslationByLanguageDto
  ) {
    if(dto) {
      return this.translationService.getTranslations(dto)
    }
    return this.translationService.getTranslations()
  }

  @Get(':id')
  getTranslationsById(
    @Param('id', ParseIntPipe) translation_id: number
  ) {
    return this.translationService.getTranslationById(translation_id)
  }
  
  @Post('create')
  createTranslation(
    @Body() dto: createTranslationDto
  ){
    return this.translationService.createTranslation(dto)
  }

  @Patch(':id')
  editTranslationsById(
    @Param('id', ParseIntPipe) translation_id: number,
    @Body() dto: editTranslationDto
  ) {
    return this.translationService.editTranslationById(translation_id, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTranslationById(
    @Param('id', ParseIntPipe) translation_id: number
  ) {
    return this.translationService.deleteTranslationById(translation_id)
  }

}
