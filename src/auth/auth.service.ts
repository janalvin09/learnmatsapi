import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@src/prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import * as argon from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signup(dto: RegisterDto) {
    const hash = await argon.hash(dto.password)
    try {
      
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: hash
        }
      })
      
      return this.signToken(user.id, user.name, user.email)

    }catch(error) {
      if ( error instanceof PrismaClientKnownRequestError ) {
        if ( error.code === 'P2002' ) {
          throw new ForbiddenException('Credentials taken')
        }
      }
    }
  }

  async signin(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    if(!user) throw new ForbiddenException('Credentials incorrect')

    const pwMatches = await argon.verify(user.password, dto.password)
  
    if(!pwMatches) throw new ForbiddenException('Credentials incorrect')
  
    return this.signToken(user.id, user.name, user.email)

  }

  async signToken(user_id: number, name: string, email: string): Promise<{ access_token: string }> {
    
    const secret = this.config.get("JWT_SECRET")
    const payload = {
      sub: user_id,
      name,
      email
    }

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: secret
    })

    return {
      access_token: token
    }

  }

}
