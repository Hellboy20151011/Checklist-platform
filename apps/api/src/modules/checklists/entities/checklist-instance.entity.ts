import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ChecklistStatus } from '../../../common/enums/checklist-status.enum';
import { ChecklistTemplate } from '../../templates/entities/checklist-template.entity';
import { User } from '../../users/entities/user.entity';

@Entity('checklist_instances')
export class ChecklistInstance extends BaseEntity {
  @ManyToOne(() => ChecklistTemplate)
  @JoinColumn({ name: 'template_id' })
  template!: ChecklistTemplate;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assigned_to' })
  assignedTo!: User;

  @Column({
    type: 'enum',
    enum: ChecklistStatus,
    default: ChecklistStatus.DRAFT,
  })
  status!: ChecklistStatus;

  @Column({ name: 'started_at', type: 'timestamptz', nullable: true })
  startedAt!: Date | null;

  @Column({ name: 'submitted_at', type: 'timestamptz', nullable: true })
  submittedAt!: Date | null;

  @Column({ name: 'reviewed_at', type: 'timestamptz', nullable: true })
  reviewedAt!: Date | null;
}
