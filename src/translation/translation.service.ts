import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { createTranslationDto, editTranslationDto, getTranslationByLanguageDto } from './dto';

@Injectable()
export class TranslationService {
  constructor( private prisma:PrismaService ) {}

  getTranslations(dto?: getTranslationByLanguageDto) {
    if(dto) {
      return this.prisma.tranlation.findMany({
        where: {
          language_id: dto.language_id
        }
      })
    }

    return this.prisma.tranlation.findMany({
      orderBy: {
        id: "asc"
      }
    })
  }

  getTranslationById(translation_id: number) {
    return this.prisma.tranlation.findFirst({
      where: {
        id: translation_id
      }
    })
  }

  async createTranslation(dto: createTranslationDto) {
    const translation = await this.prisma.tranlation.create({
      data: {
        ...dto
      }
    })

    return translation
  }

  async editTranslationById(translation_id: number, dto: editTranslationDto) {
    const translation = await this.prisma.tranlation.findUnique({
      where: {
        id: translation_id
      }
    })

    if(!translation) {
        throw new ForbiddenException('Acccess to resources denied')
    }

    return this.prisma.tranlation.update({
      where: {
        id: translation_id
      },
      data: {
        ...dto
      }
    })
  }

  async deleteTranslationById(translation_id: number) {
    const translation = await this.prisma.tranlation.findUnique({
      where: {
        id: translation_id
      }
    })

    if(!translation) {
      throw new ForbiddenException('Access to resources denied')
    }

    await this.prisma.tranlation.delete({
      where: {
        id: translation_id
      }
    })
  }

}
