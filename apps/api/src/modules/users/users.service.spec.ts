import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../../common/enums/role.enum';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: jest.Mocked<Repository<User>>;

  const mockUser: User = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'tech@example.com',
    name: 'Tech User',
    role: Role.TECHNICIAN,
    active: true,
    passwordHash: 'hashed_password',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const queryBuilderMock = {
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue(queryBuilderMock),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      usersRepository.find.mockResolvedValue([mockUser]);

      const result = await usersService.findAll();

      expect(result).toEqual([mockUser]);
      expect(usersRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      usersRepository.findOneBy.mockResolvedValue(mockUser);

      const result = await usersService.findOne(mockUser.id);

      expect(result).toEqual(mockUser);
      expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id: mockUser.id });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      usersRepository.findOneBy.mockResolvedValue(null);

      await expect(usersService.findOne('nonexistent-id')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should return user including passwordHash when found', async () => {
      const qb = usersRepository.createQueryBuilder('user');
      (qb.getOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await usersService.findByEmail('tech@example.com');

      expect(result).toEqual(mockUser);
    });

    it('should return null when user is not found', async () => {
      const qb = usersRepository.createQueryBuilder('user');
      (qb.getOne as jest.Mock).mockResolvedValue(null);

      const result = await usersService.findByEmail('unknown@example.com');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and return a new user', async () => {
      usersRepository.findOneBy.mockResolvedValue(null);
      usersRepository.create.mockReturnValue(mockUser);
      usersRepository.save.mockResolvedValue(mockUser);

      const result = await usersService.create({
        email: 'tech@example.com',
        password: 'password123456',
        name: 'Tech User',
        role: Role.TECHNICIAN,
      });

      expect(result).toEqual(mockUser);
      expect(usersRepository.save).toHaveBeenCalled();
    });

    it('should hash the password before saving', async () => {
      usersRepository.findOneBy.mockResolvedValue(null);
      usersRepository.create.mockImplementation((dto) => dto as User);
      usersRepository.save.mockImplementation((user) => Promise.resolve(user as User));

      await usersService.create({
        email: 'new@example.com',
        password: 'plainpassword',
        name: 'New User',
      });

      const savedArg = usersRepository.create.mock.calls[0][0] as { passwordHash: string };
      const isHashed = await bcrypt.compare('plainpassword', savedArg.passwordHash);
      expect(isHashed).toBe(true);
    });

    it('should throw ConflictException if email already exists', async () => {
      usersRepository.findOneBy.mockResolvedValue(mockUser);

      await expect(
        usersService.create({
          email: 'tech@example.com',
          password: 'password123456',
          name: 'Duplicate User',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });
});
