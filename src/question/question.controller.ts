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
import { QuestionService } from './question.service';
import { getQuestionByMatClasslevelDto, createQuestionDto, editQuestionDto } from './dto';

@UseGuards(JwtGuard)
@Controller('question')
export class QuestionController {
  constructor( private questionService: QuestionService ) {}

  @Get('get-questions')
  getQuestions(
    @Body() dto?: getQuestionByMatClasslevelDto
  ) {
    if(dto) {
      return this.questionService.getQuestions(dto)
    }
    return this.questionService.getQuestions()
  }

  @Get(':id')
  getQuestionByid(
    @Param('id', ParseIntPipe) question_id: number
  ) {
    return this.questionService.getQuestionsById(question_id)

  }

  @Post('create')
  createQuestion (
    @Body() dto: createQuestionDto
  ) {
    return this.questionService.createQuestion(dto)
  }

  @Patch(':id')
  editQuestionById(
    @Param('id', ParseIntPipe) question_id: number,
    @Body() dto: editQuestionDto
  ) {
    return this.questionService.editQuestionById(question_id, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteQuestionById (
    @Param('id', ParseIntPipe) question_id: number
  ) {
    return this.questionService.deleteQuestionById(question_id)
  }
}
