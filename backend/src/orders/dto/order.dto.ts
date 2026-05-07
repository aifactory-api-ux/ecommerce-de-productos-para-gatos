import { IsString, IsOptional, IsEnum } from 'class-validator';
import { OrderStatus } from '../../shared/dto/order.dto';

export class CreateOrderDto {
  @IsString()
  addressId: string;

  @IsOptional()
  @IsString()
  couponCode?: string;

  @IsString()
  paymentMethodId: string;
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}