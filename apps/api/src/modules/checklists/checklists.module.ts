import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistInstance } from './entities/checklist-instance.entity';
import { InstanceAnswer } from './entities/instance-answer.entity';
import { ChecklistsController } from './checklists.controller';
import { ChecklistsService } from './checklists.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChecklistInstance, InstanceAnswer])],
  controllers: [ChecklistsController],
  providers: [ChecklistsService],
  exports: [ChecklistsService],
})
export class ChecklistsModule {}
