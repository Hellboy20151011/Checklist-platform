import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ChecklistTemplate } from './checklist-template.entity';

export enum TemplateItemType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  CHECKBOX = 'CHECKBOX',
  PHOTO = 'PHOTO',
  SIGNATURE = 'SIGNATURE',
  DATE = 'DATE',
  SELECT = 'SELECT',
}

@Entity('template_items')
export class TemplateItem extends BaseEntity {
  @ManyToOne(() => ChecklistTemplate, (template) => template.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'template_id' })
  template!: ChecklistTemplate;

  @Column({
    type: 'enum',
    enum: TemplateItemType,
    default: TemplateItemType.TEXT,
  })
  type!: TemplateItemType;

  @Column()
  label!: string;

  @Column({ default: false })
  required!: boolean;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder!: number;

  @Column({ name: 'config_json', type: 'jsonb', nullable: true })
  configJson!: Record<string, unknown> | null;
}
