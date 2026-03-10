import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChecklistInstance } from '../../checklists/entities/checklist-instance.entity';
import { User } from '../../users/entities/user.entity';

export enum WorkflowAction {
  SUBMIT = 'SUBMIT',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  REQUEST_REWORK = 'REQUEST_REWORK',
}

@Entity('workflow_events')
export class WorkflowEvent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => ChecklistInstance)
  @JoinColumn({ name: 'instance_id' })
  instance!: ChecklistInstance;

  @Column({
    type: 'enum',
    enum: WorkflowAction,
  })
  action!: WorkflowAction;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'from_user_id' })
  fromUser!: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'to_user_id' })
  toUser!: User | null;

  @Column({ type: 'text', nullable: true })
  comment!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
