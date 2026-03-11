import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChecklistInstance } from './entities/checklist-instance.entity';

@Injectable()
export class ChecklistsService {
  constructor(
    @InjectRepository(ChecklistInstance)
    private readonly instancesRepository: Repository<ChecklistInstance>,
  ) {}

  async findAll(): Promise<ChecklistInstance[]> {
    return this.instancesRepository.find({
      relations: ['template', 'assignedTo'],
    });
  }

  async findOne(id: string): Promise<ChecklistInstance> {
    const instance = await this.instancesRepository.findOne({
      where: { id },
      relations: ['template', 'assignedTo'],
    });
    if (!instance) {
      throw new NotFoundException(`Checklist instance ${id} not found`);
    }
    return instance;
  }
}
