import { Controller, Get, Param } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowEvent } from './entities/workflow-event.entity';

@Controller('workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Get('instance/:instanceId')
  findByInstance(
    @Param('instanceId') instanceId: string,
  ): Promise<WorkflowEvent[]> {
    return this.workflowService.findByInstance(instanceId);
  }
}
