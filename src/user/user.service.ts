import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { UpdateUserDto } from './dto';
import * as argon from 'argon2'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getAllUsers() {
    const users =  this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      },
      where: {
        name: {
          not: "admin"
        }
      },
      orderBy: {
        id: "asc"
      }
    })

    return users
  }

  async UpdateUser (user_id: number, dto: UpdateUserDto) {

    if(dto.password) {
      let hash = await argon.hash(dto.password)
      let user = await this.prisma.user.update({
        where: {
          id: user_id
        },
        data: {
          name: dto.name,
          email: dto.email,
          password: hash
        }
      })

      delete user.password
      return user
    }
    let user = await this.prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        ...dto
      }
    })

    delete user.password
    return user

  }

}
