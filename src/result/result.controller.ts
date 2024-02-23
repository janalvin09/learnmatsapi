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
import { ResultService } from './result.service';
import { GetUser } from '@src/auth/decorator';
import { getResultByMatClasslevelDto, createResultDto, editResultDto } from './dto';

@UseGuards(JwtGuard)
@Controller('result')
export class ResultController {
  constructor(private resultService: ResultService) {}

  @Get('get-results')
  getResults(
    @GetUser('id') user_id: number,
    @Body() dto?: getResultByMatClasslevelDto
  ) {
    if(dto) {
      return this.resultService.getResults(user_id, dto)
    }
    return this.resultService.getResults(user_id)
  }

  @Get(':id')
  getResultById(
    @GetUser('id') user_id: number,
    @Param('id', ParseIntPipe) result_id: number
  ) {
    return this.resultService.getResultsById(user_id, result_id)  
  }

  @Post('create')
  createResult(
    @GetUser('id') user_id: number,
    @Body() dto: createResultDto
  ) {
    return this.resultService.createResult(user_id, dto)
  }

  @Patch(':id')
  editResultById(
    @GetUser('id') user_id: number,
    @Param('id', ParseIntPipe) result_id: number,
    @Body() dto: editResultDto
  ) {
    return this.resultService.editResultById(user_id, result_id, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteResultByid(
    @GetUser('id') user_id: number,
    @Param('id', ParseIntPipe) result_id: number
  ) {
    return this.resultService.deleteResultById(user_id, result_id)
    
  }
}
