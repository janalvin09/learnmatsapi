import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RootModule } from './root/root.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    RootModule,
    PrismaModule
  ],
})
export class AppModule {}
