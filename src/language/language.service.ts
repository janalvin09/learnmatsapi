import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { createLanguageDto, editLanguageDto } from './dto';

@Injectable()
export class LanguageService {
  constructor(private prisma: PrismaService) {}

  getLanguages() {
    return this.prisma.language.findMany({
      orderBy: {
        id: 'asc'
      }
    })
  }

  getLanguagesById(language_id: number) {
    return this.prisma.language.findFirst({
      where: {
        id: language_id
      }
    })
  }

  async createLanguage(dto: createLanguageDto) {
    const language = await this.prisma.language.create({
      data: {
        ...dto
      }
    })

    return language
  }

  async editLanguageById (language_id: number, dto: editLanguageDto) {
    const language = await this.prisma.language.findUnique({
      where: {
        id: language_id
      }
    })

    if(!language) { throw new ForbiddenException('Access to resources denied') }
    
    return this.prisma.language.update({
      where: {
        id: language_id
      },
      data: {
        ...dto
      }
    })
  }

  async deleteLanguageById (language_id: number) {
    const language = await this.prisma.language.findUnique({
      where: {
        id: language_id
      }
    }) 

    if(!language) { throw new ForbiddenException('Access to resources denied') }

    await this.prisma.language.delete({
      where: {
        id: language_id
      }
    })
  }

}
