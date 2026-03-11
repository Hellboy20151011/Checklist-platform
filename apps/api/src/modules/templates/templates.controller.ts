import { Controller, Get, Param } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { ChecklistTemplate } from './entities/checklist-template.entity';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  findAll(): Promise<ChecklistTemplate[]> {
    return this.templatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ChecklistTemplate> {
    return this.templatesService.findOne(id);
  }
}
