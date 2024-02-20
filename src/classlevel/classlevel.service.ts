import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateClasslevelDto, EditClasslevelDto } from './dto';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class ClasslevelService {
  constructor(private prisma: PrismaService) {}

  getClassLevel(){
    return this.prisma.classlevel.findMany({
      orderBy: {
        id: 'asc'
      }
    })
  }

  getClassLevelById(classlevel_id: number) {
    return this.prisma.classlevel.findFirst({
      where: {
        id: classlevel_id
      }
    })
  }

  async createClassLevel(dto: CreateClasslevelDto) {
    const classlevel = await this.prisma.classlevel.create({
      data: {
        ...dto
      }
    })

    return classlevel
  }

  async editClassLevelById(classlevel_id: number, dto: EditClasslevelDto) {

    const classlevel = await this.prisma.classlevel.findUnique({
      where: {
        id: classlevel_id
      }
    })

    if(!classlevel) { throw new ForbiddenException('Access to resources denied') }
    
    return this.prisma.classlevel.update({
      where: {
        id: classlevel_id
      },
      data: {
        ...dto
      }
    })
  }

  async deleteClassLevelById(classlevel_id: number) {
    const classlevel = await this.prisma.classlevel.findUnique({
      where: {
        id: classlevel_id
      }
    }) 

    if(!classlevel) { throw new ForbiddenException('Access to resources denied') }

    await this.prisma.classlevel.delete({
      where: {
        id: classlevel_id
      }
    })
  }

}
