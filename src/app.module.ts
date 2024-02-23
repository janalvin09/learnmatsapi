import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RootModule } from './root/root.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClasslevelModule } from './classlevel/classlevel.module';
import { MaterialModule } from './material/material.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { ResultModule } from './result/result.module';
import { LanguageModule } from './language/language.module';

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
    QuestionModule,
    AnswerModule,
    ResultModule,
    LanguageModule,
  ],
})
export class AppModule {}
