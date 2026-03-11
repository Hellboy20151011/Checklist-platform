import { Role } from '../../../common/enums/role.enum';

export class LoginResponseDto {
  accessToken!: string;
  user!: {
    id: string;
    email: string;
    name: string;
    role: Role;
  };
}
