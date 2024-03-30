import { ForbiddenException, Injectable } from '@nestjs/common';
import { getCategoryByClasslevelDto, createCategoryDto, editCategoryDto } from './dto'
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  
  getCategories (dto?: getCategoryByClasslevelDto) {
    if(dto) {
      return this.prisma.category.findMany({
        where: {
          classlevel_id: dto.classlevel_id
        }
      })
    }

    return this.prisma.category.findMany({
      orderBy: {
        id: "asc"
      }
    })
  }

  getCategoryById (category_id: number) {
    return this.prisma.category.findFirst({
        where: {
          id: category_id
        }
    })
  }

  async createCategory (dto: createCategoryDto) {
    const category = await this.prisma.category.create({
      data: {
        ...dto
      }
    })

    return category
  }

  async editCategoryById (category_id:number, dto: editCategoryDto) {

    const category = await this.prisma.category.findUnique({
      where: {
        id: category_id
      }
    })

    if(!category) {
        throw new ForbiddenException('Acccess to resources denied')
    }

    return this.prisma.category.update({
      where: {
        id: category_id
      },
      data: {
        ...dto
      }
    })

  }

  async deleteCategoryById (category_id:number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: category_id
      }
    })

    if(!category) {
      throw new ForbiddenException('Access to resources denied')
    }

    await this.prisma.category.delete({
      where: {
        id: category_id
      }
    })

  }

}
