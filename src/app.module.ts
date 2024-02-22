import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RootModule } from './root/root.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClasslevelModule } from './classlevel/classlevel.module';
import { MaterialModule } from './material/material.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    RootModule,
    PrismaModule,
    UserModule,
    AuthModule,
    ClasslevelModule,
    MaterialModule,
  ],
})
export class AppModule {}
