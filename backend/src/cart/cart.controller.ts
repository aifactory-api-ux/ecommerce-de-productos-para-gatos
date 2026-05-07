import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, RemoveFromCartDto } from '../shared/dto/cart-item.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt.strategy';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Request() req: any) {
    return this.cartService.getCart(req.user.userId);
  }

  @Post('add')
  async addToCart(@Request() req: any, @Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(req.user.userId, addToCartDto);
  }

  @Post('remove')
  async removeFromCart(@Request() req: any, @Body() removeFromCartDto: RemoveFromCartDto) {
    return this.cartService.removeFromCart(req.user.userId, removeFromCartDto);
  }

  @Post('clear')
  async clearCart(@Request() req: any) {
    return this.cartService.clearCart(req.user.userId);
  }
}