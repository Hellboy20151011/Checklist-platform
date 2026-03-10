export enum UserRole {
  ADMIN = 'ADMIN',
  TECHNICIAN = 'TECHNICIAN',
  REVIEWER = 'REVIEWER',
}

export enum TemplateStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum ChecklistStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REWORK_REQUIRED = 'REWORK_REQUIRED',
}

export enum WorkflowAction {
  SUBMIT = 'SUBMIT',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  REQUEST_REWORK = 'REQUEST_REWORK',
}

export enum TemplateItemType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  CHECKBOX = 'CHECKBOX',
  PHOTO = 'PHOTO',
  SIGNATURE = 'SIGNATURE',
  DATE = 'DATE',
  SELECT = 'SELECT',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistTemplate {
  id: string;
  title: string;
  description?: string;
  version: number;
  status: TemplateStatus;
  createdBy: string;
  items: TemplateItem[];
  createdAt: string;
  updatedAt: string;
}

export interface TemplateItem {
  id: string;
  templateId: string;
  type: TemplateItemType;
  label: string;
  required: boolean;
  sortOrder: number;
  configJson?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistInstance {
  id: string;
  templateId: string;
  assignedTo: string;
  status: ChecklistStatus;
  startedAt?: string;
  submittedAt?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InstanceAnswer {
  id: string;
  instanceId: string;
  templateItemId: string;
  valueJson: unknown;
  comment?: string;
  updatedBy: string;
  updatedAt: string;
  version: number;
}

export interface WorkflowEvent {
  id: string;
  instanceId: string;
  action: WorkflowAction;
  fromUserId: string;
  toUserId?: string;
  comment?: string;
  createdAt: string;
}

export interface SyncChangeLog {
  id: string;
  deviceId: string;
  entityType: string;
  entityId: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  payloadJson: unknown;
  createdAt: string;
  syncedAt?: string;
}
