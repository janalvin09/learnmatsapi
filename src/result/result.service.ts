import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { createResultDto, editResultDto, getResultByMatClasslevelDto } from './dto';

@Injectable()
export class ResultService {
  constructor(private prisma: PrismaService) {}

  getResults(user_id: number, dto?: getResultByMatClasslevelDto) {

    if(dto.material_id && dto.classlevel_id) {
      return this.prisma.result.findMany({
        where: {
          user_id,
          material_id: dto.material_id,
          classlevel_id: dto.classlevel_id
        }
      })
    }
    
    if(dto.material_id) {
      return this.prisma.result.findMany({
        where: {
          user_id,
          material_id: dto.material_id
        }
      })
    }

    if(dto.classlevel_id) {
      return this.prisma.result.findMany({
        where: {
          user_id,
          classlevel_id: dto.classlevel_id
        }
      })
    }

    return this.prisma.result.findMany({
      where: {
        user_id
      },
      orderBy: {
        id: "asc"
      }
    })
  }

  getResultsById(user_id: number, result_id: number) {
    return this.prisma.result.findFirst({
      where: {
        id: result_id,
        user_id
      }
    })
  }

  async createResult (user_id:number, dto: createResultDto) {
    const result = await this.prisma.result.create({
      data: {
        user_id,
        ...dto
      }
    })

    return result
  }

  async editResultById (user_id: number, result_id: number, dto: editResultDto) {
    const result = await this.prisma.result.findUnique({
      where: {
        id: result_id
      }
    })

    if(!result || result.user_id !== user_id) {  
      throw new ForbiddenException('Access to resources denied')
    }

    return this.prisma.result.update({
      where: {
        id: result_id
      },
      data: {
        ...dto
      }
    })
  }

  async deleteResultById (user_id: number, result_id: number,) {
    const result = await this.prisma.result.findUnique({
      where: {
        id: result_id
      }
    }) 

    if(!result || result.user_id !== user_id){
      throw new ForbiddenException('Access to resources denied')
    }

    await this.prisma.result.delete({
      where: {
        id: result_id
      }
    })
  }

}