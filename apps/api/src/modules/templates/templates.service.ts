import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChecklistTemplate } from './entities/checklist-template.entity';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(ChecklistTemplate)
    private readonly templatesRepository: Repository<ChecklistTemplate>,
  ) {}

  async findAll(): Promise<ChecklistTemplate[]> {
    return this.templatesRepository.find({ relations: ['items'] });
  }

  async findOne(id: string): Promise<ChecklistTemplate> {
    const template = await this.templatesRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!template) {
      throw new NotFoundException(`Template ${id} not found`);
    }
    return template;
  }
}
