import { Controller, Get, Param } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { ChecklistInstance } from './entities/checklist-instance.entity';

@Controller('checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  @Get()
  findAll(): Promise<ChecklistInstance[]> {
    return this.checklistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ChecklistInstance> {
    return this.checklistsService.findOne(id);
  }
}
