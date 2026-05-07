import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderStatusDto, OrderResponseDto, OrderStatus } from '../shared/dto/order.dto';
import { OrderItemDto } from '../shared/dto/order-item.dto';
import { AddressDto } from '../shared/dto/address.dto';
import { generateUuid } from '../shared/utils';

@Injectable()
export class OrdersService {
  private orders: Map<string, any> = new Map();

  async findAllByUser(userId: string): Promise<OrderResponseDto[]> {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  async findOne(id: string, userId: string): Promise<OrderResponseDto> {
    const order = this.orders.get(id);
    if (!order || order.userId !== userId) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async create(userId: string, createOrderDto: CreateOrderDto, items: OrderItemDto[], total: number, shippingAddress: AddressDto, paymentIntentId: string): Promise<OrderResponseDto> {
    const order = {
      id: generateUuid(),
      userId,
      items,
      total,
      status: OrderStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      shippingAddress,
      paymentIntentId,
    };
    this.orders.set(order.id, order);
    return order;
  }

  async updateStatus(id: string, updateStatusDto: UpdateOrderStatusDto): Promise<OrderResponseDto> {
    const order = this.orders.get(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    const updated = {
      ...order,
      status: updateStatusDto.status,
      updatedAt: new Date().toISOString(),
    };
    this.orders.set(id, updated);
    return updated;
  }
}