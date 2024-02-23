import { ForbiddenException, Injectable } from '@nestjs/common';
import { getMaterialByClasslevelDto, createMaterialDto, editMaterialDto } from './dto';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class MaterialService {
  constructor(private prisma: PrismaService) {}

  getMaterials (dto?: getMaterialByClasslevelDto) {

    if(dto) {
      return this.prisma.material.findMany({
        where: {
          classlevel_id: dto.classlevel_id
        }
      })
    }

    return this.prisma.material.findMany({
      orderBy: {
        id: "asc"
      }
    })

  }

  getMaterialById (material_id: number) {
    return this.prisma.material.findFirst({
        where: {
          id: material_id
        }
    })
  }

  async createMaterial (dto: createMaterialDto) {
    const material = await this.prisma.material.create({
      data: {
        ...dto
      }
    })

    return material
  }

  async editMaterialById (material_id:number, dto: editMaterialDto) {

    const material = await this.prisma.material.findUnique({
      where: {
        id: material_id
      }
    })

    if(!material) {
        throw new ForbiddenException('Acccess to resources denied')
    }

    return this.prisma.material.update({
      where: {
        id: material_id
      },
      data: {
        ...dto
      }
    })

  }

  async deleteMaterialById (material_id:number) {
    const material = await this.prisma.material.findUnique({
      where: {
        id: material_id
      }
    })

    if(!material) {
      throw new ForbiddenException('Access to resources denied')
    }

    await this.prisma.material.delete({
      where: {
        id: material_id
      }
    })

  }

}
