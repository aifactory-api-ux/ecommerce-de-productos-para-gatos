import { Test, TestingModule } from '@nestjs/testing';
import { CouponsService } from './coupons.service';
import { NotFoundException } from '@nestjs/common';

describe('CouponsService', () => {
  let couponsService: CouponsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouponsService],
    }).compile();

    couponsService = module.get<CouponsService>(CouponsService);
  });

  describe('create', () => {
    it('should create a coupon', async () => {
      const result = await couponsService.create({
        code: 'SAVE10',
        discount: 10,
        validFrom: '2024-01-01T00:00:00.000Z',
        validTo: '2024-12-31T00:00:00.000Z',
        usageLimit: 100,
        active: true,
      });

      expect(result).toHaveProperty('id');
      expect(result.code).toBe('SAVE10');
      expect(result.usedCount).toBe(0);
    });
  });

  describe('findAll', () => {
    it('should return all coupons', async () => {
      await couponsService.create({
        code: 'SAVE10',
        discount: 10,
        validFrom: '2024-01-01T00:00:00.000Z',
        validTo: '2024-12-31T00:00:00.000Z',
        usageLimit: 100,
        active: true,
      });

      const result = await couponsService.findAll();

      expect(result.length).toBe(1);
    });
  });

  describe('update', () => {
    it('should update a coupon', async () => {
      const created = await couponsService.create({
        code: 'SAVE10',
        discount: 10,
        validFrom: '2024-01-01T00:00:00.000Z',
        validTo: '2024-12-31T00:00:00.000Z',
        usageLimit: 100,
        active: true,
      });

      const result = await couponsService.update(created.id, { discount: 20 });

      expect(result.discount).toBe(20);
    });

    it('should throw NotFoundException for non-existent coupon', async () => {
      await expect(couponsService.update('non-existent', { discount: 20 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a coupon', async () => {
      const created = await couponsService.create({
        code: 'SAVE10',
        discount: 10,
        validFrom: '2024-01-01T00:00:00.000Z',
        validTo: '2024-12-31T00:00:00.000Z',
        usageLimit: 100,
        active: true,
      });

      const result = await couponsService.remove(created.id);

      expect(result.success).toBe(true);
    });

    it('should throw NotFoundException for non-existent coupon', async () => {
      await expect(couponsService.remove('non-existent')).rejects.toThrow(NotFoundException);
    });
  });
});