import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { NotFoundException } from '@nestjs/common';

describe('CartService', () => {
  let cartService: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    cartService = module.get<CartService>(CartService);
  });

  describe('getCart', () => {
    it('should return empty cart for new user', async () => {
      const result = await cartService.getCart('new-user');

      expect(result.items).toEqual([]);
    });

    it('should return existing cart', async () => {
      await cartService.addToCart('user-123', { productId: 'prod-1', quantity: 2 });

      const result = await cartService.getCart('user-123');

      expect(result.items.length).toBe(1);
    });
  });

  describe('addToCart', () => {
    it('should add item to cart', async () => {
      const result = await cartService.addToCart('user-123', { productId: 'prod-1', quantity: 2 });

      expect(result.items.length).toBe(1);
      expect(result.items[0].quantity).toBe(2);
    });

    it('should increase quantity if item exists', async () => {
      await cartService.addToCart('user-123', { productId: 'prod-1', quantity: 2 });
      const result = await cartService.addToCart('user-123', { productId: 'prod-1', quantity: 3 });

      expect(result.items[0].quantity).toBe(5);
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', async () => {
      await cartService.addToCart('user-123', { productId: 'prod-1', quantity: 2 });
      const result = await cartService.removeFromCart('user-123', { productId: 'prod-1' });

      expect(result.items.length).toBe(0);
    });

    it('should throw NotFoundException if cart not found', async () => {
      await expect(
        cartService.removeFromCart('non-existent', { productId: 'prod-1' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', async () => {
      await cartService.addToCart('user-123', { productId: 'prod-1', quantity: 2 });
      await cartService.addToCart('user-123', { productId: 'prod-2', quantity: 1 });

      const result = await cartService.clearCart('user-123');

      expect(result.items.length).toBe(0);
    });

    it('should create cart if not exists and clear', async () => {
      const result = await cartService.clearCart('new-user');
      expect(result.items.length).toBe(0);
    });
  });
});