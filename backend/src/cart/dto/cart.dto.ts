import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CartItemDto } from './cart-item.dto';

export class CartDto {
  id: string;
  userId: string;
  items: CartItemDto[];
  updatedAt: string;
}