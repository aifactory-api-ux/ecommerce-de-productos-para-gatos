import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto, UpdateCouponDto, CouponResponseDto } from '../shared/dto/coupon.dto';
import { generateUuid } from '../shared/utils';

@Injectable()
export class CouponsService {
  private coupons: Map<string, any> = new Map();

  async findAll(): Promise<CouponResponseDto[]> {
    return Array.from(this.coupons.values());
  }

  async create(createCouponDto: CreateCouponDto): Promise<CouponResponseDto> {
    const coupon = {
      id: generateUuid(),
      ...createCouponDto,
      usedCount: 0,
    };
    this.coupons.set(coupon.id, coupon);
    return coupon;
  }

  async update(id: string, updateCouponDto: UpdateCouponDto): Promise<CouponResponseDto> {
    const coupon = this.coupons.get(id);
    if (!coupon) {
      throw new NotFoundException(`Coupon with id ${id} not found`);
    }
    const updated = { ...coupon, ...updateCouponDto };
    this.coupons.set(id, updated);
    return updated;
  }

  async remove(id: string): Promise<{ success: boolean }> {
    if (!this.coupons.has(id)) {
      throw new NotFoundException(`Coupon with id ${id} not found`);
    }
    this.coupons.delete(id);
    return { success: true };
  }
}