import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Role } from '../../../common/enums/role.enum';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column({ name: 'password_hash' })
  passwordHash!: string;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.TECHNICIAN,
  })
  role!: Role;

  @Column({ default: true })
  active!: boolean;
}
