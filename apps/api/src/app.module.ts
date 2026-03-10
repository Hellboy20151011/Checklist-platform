import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { ChecklistsModule } from './modules/checklists/checklists.module';
import { WorkflowModule } from './modules/workflow/workflow.module';
import { SyncModule } from './modules/sync/sync.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TemplatesModule,
    ChecklistsModule,
    WorkflowModule,
    SyncModule,
  ],
})
export class AppModule {}
