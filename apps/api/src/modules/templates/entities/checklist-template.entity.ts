import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { TemplateStatus } from '../../../common/enums/template-status.enum';
import { TemplateItem } from './template-item.entity';

@Entity('checklist_templates')
export class ChecklistTemplate extends BaseEntity {
  @Column()
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ default: 1 })
  version!: number;

  @Column({
    type: 'enum',
    enum: TemplateStatus,
    default: TemplateStatus.DRAFT,
  })
  status!: TemplateStatus;

  @Column({ name: 'created_by' })
  createdBy!: string;

  @OneToMany(() => TemplateItem, (item) => item.template, { cascade: true })
  items!: TemplateItem[];
}
