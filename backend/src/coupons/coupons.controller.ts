import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto, UpdateCouponDto } from '../shared/dto/coupon.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt.strategy';
import { AdminOnly } from '../shared/decorators/roles.decorator';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @AdminOnly()
  async findAll() {
    return this.couponsService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @AdminOnly()
  async create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @AdminOnly()
  async update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(id, updateCouponDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @AdminOnly()
  async remove(@Param('id') id: string) {
    return this.couponsService.remove(id);
  }
}