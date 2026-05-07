import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from './addresses.service';
import { NotFoundException } from '@nestjs/common';

describe('AddressesService', () => {
  let addressesService: AddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressesService],
    }).compile();

    addressesService = module.get<AddressesService>(AddressesService);
  });

  describe('create', () => {
    it('should create an address', async () => {
      const result = await addressesService.create('user-123', {
        fullName: 'John Doe',
        addressLine1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'US',
        phone: '1234567890',
      });

      expect(result).toHaveProperty('id');
      expect(result.fullName).toBe('John Doe');
    });
  });

  describe('findAllByUser', () => {
    it('should return addresses for a user', async () => {
      await addressesService.create('user-123', {
        fullName: 'John Doe',
        addressLine1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'US',
        phone: '1234567890',
      });

      const result = await addressesService.findAllByUser('user-123');

      expect(result.length).toBe(1);
    });
  });

  describe('update', () => {
    it('should update an address', async () => {
      const created = await addressesService.create('user-123', {
        fullName: 'John Doe',
        addressLine1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'US',
        phone: '1234567890',
      });

      const result = await addressesService.update(created.id, 'user-123', { fullName: 'Jane Doe' });

      expect(result.fullName).toBe('Jane Doe');
    });

    it('should throw NotFoundException for non-existent address', async () => {
      await expect(
        addressesService.update('non-existent', 'user-123', { fullName: 'Jane Doe' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException when updating another users address', async () => {
      const created = await addressesService.create('user-123', {
        fullName: 'John Doe',
        addressLine1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'US',
        phone: '1234567890',
      });

      await expect(
        addressesService.update(created.id, 'different-user', { fullName: 'Jane Doe' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an address', async () => {
      const created = await addressesService.create('user-123', {
        fullName: 'John Doe',
        addressLine1: '123 Main St',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'US',
        phone: '1234567890',
      });

      const result = await addressesService.remove(created.id, 'user-123');

      expect(result.success).toBe(true);
    });

    it('should throw NotFoundException for non-existent address', async () => {
      await expect(addressesService.remove('non-existent', 'user-123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});