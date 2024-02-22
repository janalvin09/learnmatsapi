import { ForbiddenException, Injectable } from '@nestjs/common';
import { getQuestionByMatClasslevelDto, createQuestionDto, editQuestionDto } from './dto';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private prisma: PrismaService) {}

  getQuestions(dto?: getQuestionByMatClasslevelDto) {

    if(dto.material_id && dto.classlevel_id) {
      return this.prisma.question.findMany({
        where: {
          material_id: dto.material_id,
          classlevel_id: dto.classlevel_id
        }
      })
    }
    
    if(dto.material_id) {
      return this.prisma.question.findMany({
        where: {
          material_id: dto.material_id
        }
      })
    }

    if(dto.classlevel_id) {
      return this.prisma.question.findMany({
        where: {
          classlevel_id: dto.classlevel_id
        }
      })
    }

    return this.prisma.question.findMany({
      orderBy: {
        id: "asc"
      }
    })


  }
  
  getQuestionsById(question_id: number) {
    return this.prisma.question.findFirst({
      where: {
        id: question_id
      }
    })
  }

  async createQuestion(dto: createQuestionDto) {
    const question = await this.prisma.question.create({
      data: {
        ...dto
      }
    })

    return question
  }
  
  async editQuestionById(question_id: number, dto: editQuestionDto) {

    const question = await this.prisma.question.findUnique({
      where: {
        id: question_id
      }
    })

    if(!question) {  
      throw new ForbiddenException('Access to resources denied')
    }

    return this.prisma.question.update({
      where: {
        id: question_id
      },
      data: {
        ...dto
      }
    })

  }

  async deleteQuestionById(question_id: number) {

    const question = await this.prisma.question.findUnique({
      where: {
        id: question_id
      }
    })

    if(!question) {
      throw new ForbiddenException('Access to resources denied')
    }

    await this.prisma.question.delete({
      where: {
        id: question_id
      }
    })

  }

}
