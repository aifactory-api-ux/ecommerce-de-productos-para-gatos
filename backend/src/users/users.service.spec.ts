import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      const result = await usersService.create({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        passwordHash: 'salt:hash',
      });

      expect(result).toHaveProperty('id');
      expect(result.email).toBe('test@example.com');
      expect(result.role).toBe('customer');
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email', async () => {
      await usersService.create({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        passwordHash: 'salt:hash',
      });

      const result = await usersService.findByEmail('test@example.com');

      expect(result?.email).toBe('test@example.com');
    });

    it('should return undefined for non-existent email', async () => {
      const result = await usersService.findByEmail('non-existent@example.com');
      expect(result).toBeUndefined();
    });
  });

  describe('findById', () => {
    it('should find a user by id', async () => {
      const created = await usersService.create({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        passwordHash: 'salt:hash',
      });

      const result = await usersService.findById(created.id);

      expect(result.id).toBe(created.id);
    });

    it('should throw NotFoundException for non-existent id', async () => {
      await expect(usersService.findById('non-existent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const created = await usersService.create({
        email: 'test@example.com',
        password: 'password123',
        name: 'Original Name',
        passwordHash: 'salt:hash',
      });

      const result = await usersService.update(created.id, { name: 'Updated Name' });

      expect(result.name).toBe('Updated Name');
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const created = await usersService.create({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        passwordHash: 'salt:hash',
      });

      const result = await usersService.remove(created.id);

      expect(result.success).toBe(true);
    });
  });
});