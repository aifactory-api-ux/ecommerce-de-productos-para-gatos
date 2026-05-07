import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto, RemoveFromCartDto, CartItemDto } from '../shared/dto/cart-item.dto';
import { CartResponseDto } from '../shared/dto/cart.dto';
import { generateUuid } from '../shared/utils';

@Injectable()
export class CartService {
  private carts: Map<string, { id: string; userId: string; items: CartItemDto[]; updatedAt: string }> = new Map();

  async getCart(userId: string): Promise<CartResponseDto> {
    let cart = Array.from(this.carts.values()).find(c => c.userId === userId);
    if (!cart) {
      cart = {
        id: generateUuid(),
        userId,
        items: [],
        updatedAt: new Date().toISOString(),
      };
      this.carts.set(cart.id, cart);
    }
    return cart;
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<CartResponseDto> {
    let cart = Array.from(this.carts.values()).find(c => c.userId === userId);
    if (!cart) {
      cart = {
        id: generateUuid(),
        userId,
        items: [],
        updatedAt: new Date().toISOString(),
      };
    }

    const existingItem = cart.items.find(item => item.productId === addToCartDto.productId);
    if (existingItem) {
      existingItem.quantity += addToCartDto.quantity;
    } else {
      cart.items.push({ productId: addToCartDto.productId, quantity: addToCartDto.quantity });
    }

    cart.updatedAt = new Date().toISOString();
    this.carts.set(cart.id, cart);
    return cart;
  }

  async removeFromCart(userId: string, removeFromCartDto: RemoveFromCartDto): Promise<CartResponseDto> {
    const cart = Array.from(this.carts.values()).find(c => c.userId === userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = cart.items.filter(item => item.productId !== removeFromCartDto.productId);
    cart.updatedAt = new Date().toISOString();
    this.carts.set(cart.id, cart);
    return cart;
  }

  async clearCart(userId: string): Promise<CartResponseDto> {
    let cart = Array.from(this.carts.values()).find(c => c.userId === userId);
    if (!cart) {
      cart = {
        id: generateUuid(),
        userId,
        items: [],
        updatedAt: new Date().toISOString(),
      };
    }

    cart.items = [];
    cart.updatedAt = new Date().toISOString();
    this.carts.set(cart.id, cart);
    return cart;
  }
}