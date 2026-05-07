import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { NotFoundException } from '@nestjs/common';
import { OrderStatus } from '../shared/dto/order.dto';

describe('OrdersService', () => {
  let ordersService: OrdersService;

  const mockOrderItem = {
    productId: 'prod-123',
    name: 'Test Product',
    price: 99.99,
    quantity: 2,
    image: 'image.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
  });

  describe('create', () => {
    it('should create an order', async () => {
      const result = await ordersService.create(
        'user-123',
        { addressId: 'addr-123', paymentMethodId: 'pm-123' },
        [mockOrderItem],
        199.99,
        { fullName: 'Test', addressLine1: '123 St', city: 'NYC', state: 'NY', postalCode: '10001', country: 'US', phone: '1234567890' },
        'pi-123',
      );

      expect(result).toHaveProperty('id');
      expect(result.userId).toBe('user-123');
      expect(result.status).toBe(OrderStatus.PENDING);
    });
  });

  describe('findAllByUser', () => {
    it('should return orders for a user', async () => {
      await ordersService.create(
        'user-123',
        { addressId: 'addr-123', paymentMethodId: 'pm-123' },
        [mockOrderItem],
        199.99,
        { fullName: 'Test', addressLine1: '123 St', city: 'NYC', state: 'NY', postalCode: '10001', country: 'US', phone: '1234567890' },
        'pi-123',
      );

      const result = await ordersService.findAllByUser('user-123');

      expect(result.length).toBe(1);
    });

    it('should return empty array for user with no orders', async () => {
      const result = await ordersService.findAllByUser('user-without-orders');
      expect(result.length).toBe(0);
    });
  });

  describe('findOne', () => {
    it('should return an order by id', async () => {
      const created = await ordersService.create(
        'user-123',
        { addressId: 'addr-123', paymentMethodId: 'pm-123' },
        [mockOrderItem],
        199.99,
        { fullName: 'Test', addressLine1: '123 St', city: 'NYC', state: 'NY', postalCode: '10001', country: 'US', phone: '1234567890' },
        'pi-123',
      );

      const result = await ordersService.findOne(created.id, 'user-123');

      expect(result.id).toBe(created.id);
    });

    it('should throw NotFoundException for non-existent order', async () => {
      await expect(ordersService.findOne('non-existent', 'user-123')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when accessing another users order', async () => {
      const created = await ordersService.create(
        'user-123',
        { addressId: 'addr-123', paymentMethodId: 'pm-123' },
        [mockOrderItem],
        199.99,
        { fullName: 'Test', addressLine1: '123 St', city: 'NYC', state: 'NY', postalCode: '10001', country: 'US', phone: '1234567890' },
        'pi-123',
      );

      await expect(ordersService.findOne(created.id, 'different-user')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateStatus', () => {
    it('should update order status', async () => {
      const created = await ordersService.create(
        'user-123',
        { addressId: 'addr-123', paymentMethodId: 'pm-123' },
        [mockOrderItem],
        199.99,
        { fullName: 'Test', addressLine1: '123 St', city: 'NYC', state: 'NY', postalCode: '10001', country: 'US', phone: '1234567890' },
        'pi-123',
      );

      const result = await ordersService.updateStatus(created.id, { status: OrderStatus.PAID });

      expect(result.status).toBe(OrderStatus.PAID);
    });
  });
});