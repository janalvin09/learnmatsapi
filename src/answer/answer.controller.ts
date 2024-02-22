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
import { AnswerService } from './answer.service';
import { getAnswerByQuestionDto, createAnswerDto, editAnswerDto } from './dto';

@UseGuards(JwtGuard)
@Controller('answer')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Get('get-answers')
  getAnswers(
    @Body() dto?: getAnswerByQuestionDto
  ) {
    if(dto) {
      return this.answerService.getAnswers(dto)
    }
    return this.answerService.getAnswers()
  }

  @Get(':id')
  getAnswerById(
    @Param('id', ParseIntPipe) answer_id: number
  ){
    return this.answerService.getAnswerById(answer_id)
  }

  @Post('create')
  createAnswer(
    @Body() dto: createAnswerDto
  ) {
    return this.answerService.createAnswer(dto)
  }

  @Patch(':id')
  editAnswerById(
    @Param('id', ParseIntPipe) answer_id: number,
    @Body() dto: editAnswerDto
  ){
    return this.answerService.editAnswerById(answer_id, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteAnswerById(
    @Param('id', ParseIntPipe) answer_id: number
  ) {
    return this.answerService.deleteAnswerById(answer_id)
  }

}
