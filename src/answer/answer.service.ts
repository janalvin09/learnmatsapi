import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { getAnswerByQuestionDto, createAnswerDto, editAnswerDto } from './dto';

@Injectable()
export class AnswerService {
  constructor( private prisma: PrismaService ) {}

  getAnswers(dto?: getAnswerByQuestionDto) {

    if(dto) {
      return this.prisma.answer.findMany({
        where: {
          question_id: dto.question_id
        }
      })
    }

    return this.prisma.answer.findMany({
      orderBy: {
        id: "asc"
      }
    })
    
  }

  getAnswerById (answer_id: number) {
    return this.prisma.answer.findFirst({
      where: {
        id: answer_id
      }
    })
  }

  async createAnswer(dto: createAnswerDto) {
    const answer = await this.prisma.answer.create({
      data: {
        ...dto
      }
    })

    return answer
  }
  
  async editAnswerById(answer_id: number, dto: editAnswerDto) {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id: answer_id
      }
    })

    if(!answer) {  
      throw new ForbiddenException('Access to resources denied')
    }

    return this.prisma.answer.update({
      where: {
        id: answer_id
      },
      data: {
        ...dto
      }
    })
  }

  async deleteAnswerById(answer_id: number) {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id: answer_id
      }
    })

    if(!answer) {
      throw new ForbiddenException('Access to resources denied')
    }

    await this.prisma.answer.delete({
      where: {
        id: answer_id
      }
    })
  }

}
