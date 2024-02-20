import { Module } from '@nestjs/common';
import { ClasslevelController } from './classlevel.controller';
import { ClasslevelService } from './classlevel.service';

@Module({
  controllers: [ClasslevelController],
  providers: [ClasslevelService]
})
export class ClasslevelModule {}
