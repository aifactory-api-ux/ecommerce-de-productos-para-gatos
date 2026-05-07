import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserResponseDto, UserRole } from '../shared/dto/user.dto';
import { generateUuid } from '../shared/utils';

@Injectable()
export class UsersService {
  private users: Map<string, any> = new Map();

  async create(createUserDto: CreateUserDto & { passwordHash: string }): Promise<any> {
    const user = {
      id: generateUuid(),
      email: createUserDto.email,
      passwordHash: createUserDto.passwordHash,
      name: createUserDto.name,
      avatarUrl: null,
      role: UserRole.CUSTOMER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  async findByEmail(email: string): Promise<any> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async findById(id: string): Promise<any> {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findAll(): Promise<UserResponseDto[]> {
    return Array.from(this.users.values()).map(user => this.toUserResponse(user));
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const updated = {
      ...user,
      ...updateUserDto,
      updatedAt: new Date(),
    };
    this.users.set(id, updated);
    return this.toUserResponse(updated);
  }

  async remove(id: string): Promise<{ success: boolean }> {
    if (!this.users.has(id)) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.delete(id);
    return { success: true };
  }

  private toUserResponse(user: any): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}