import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { TemplateItem } from '../../templates/entities/template-item.entity';
import { ChecklistInstance } from './checklist-instance.entity';
import { User } from '../../users/entities/user.entity';

@Entity('instance_answers')
export class InstanceAnswer extends BaseEntity {
  @ManyToOne(() => ChecklistInstance, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'instance_id' })
  instance!: ChecklistInstance;

  @ManyToOne(() => TemplateItem)
  @JoinColumn({ name: 'template_item_id' })
  templateItem!: TemplateItem;

  @Column({ name: 'value_json', type: 'jsonb', nullable: true })
  valueJson!: unknown;

  @Column({ type: 'text', nullable: true })
  comment!: string | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updatedBy!: User;

  @Column({ default: 1 })
  version!: number;
}
