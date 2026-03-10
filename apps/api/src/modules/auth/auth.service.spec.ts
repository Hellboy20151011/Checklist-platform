import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { Role } from '../../common/enums/role.enum';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'admin@example.com',
    name: 'Admin User',
    role: Role.ADMIN,
    active: true,
    passwordHash: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock-jwt-token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return access token and user data on valid credentials', async () => {
      const password = 'secretpassword';
      const passwordHash = await bcrypt.hash(password, 10);
      const userWithHash = { ...mockUser, passwordHash };

      usersService.findByEmail.mockResolvedValue(userWithHash as any);

      const result = await authService.login({
        email: 'admin@example.com',
        password,
      });

      expect(result.accessToken).toBe('mock-jwt-token');
      expect(result.user.email).toBe('admin@example.com');
      expect(result.user.role).toBe(Role.ADMIN);
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
      });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login({ email: 'unknown@example.com', password: 'anypass' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user is inactive', async () => {
      usersService.findByEmail.mockResolvedValue({
        ...mockUser,
        active: false,
        passwordHash: 'hash',
      } as any);

      await expect(
        authService.login({ email: 'admin@example.com', password: 'anypass' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is wrong', async () => {
      const passwordHash = await bcrypt.hash('correctpassword', 10);
      usersService.findByEmail.mockResolvedValue({
        ...mockUser,
        passwordHash,
      } as any);

      await expect(
        authService.login({ email: 'admin@example.com', password: 'wrongpassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
