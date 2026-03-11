import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowEvent } from './entities/workflow-event.entity';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(WorkflowEvent)
    private readonly workflowEventsRepository: Repository<WorkflowEvent>,
  ) {}

  async findByInstance(instanceId: string): Promise<WorkflowEvent[]> {
    return this.workflowEventsRepository.find({
      where: { instance: { id: instanceId } },
      relations: ['fromUser', 'toUser'],
      order: { createdAt: 'ASC' },
    });
  }
}
