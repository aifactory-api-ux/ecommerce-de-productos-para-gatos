import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto, UpdateAddressDto, AddressDto } from '../shared/dto/address.dto';
import { generateUuid } from '../shared/utils';

@Injectable()
export class AddressesService {
  private addresses: Map<string, any> = new Map();

  async findAllByUser(userId: string): Promise<AddressDto[]> {
    return Array.from(this.addresses.values()).filter(addr => addr.userId === userId);
  }

  async create(userId: string, createAddressDto: CreateAddressDto): Promise<AddressDto> {
    const address = {
      id: generateUuid(),
      userId,
      fullName: createAddressDto.fullName,
      addressLine1: createAddressDto.addressLine1,
      addressLine2: createAddressDto.addressLine2 || '',
      city: createAddressDto.city,
      state: createAddressDto.state,
      postalCode: createAddressDto.postalCode,
      country: createAddressDto.country,
      phone: createAddressDto.phone,
    };
    this.addresses.set(address.id, address);
    return address;
  }

  async update(id: string, userId: string, updateAddressDto: UpdateAddressDto): Promise<AddressDto> {
    const address = this.addresses.get(id);
    if (!address || address.userId !== userId) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }
    const updated = { ...address, ...updateAddressDto };
    this.addresses.set(id, updated);
    return updated;
  }

  async remove(id: string, userId: string): Promise<{ success: boolean }> {
    const address = this.addresses.get(id);
    if (!address || address.userId !== userId) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }
    this.addresses.delete(id);
    return { success: true };
  }
}