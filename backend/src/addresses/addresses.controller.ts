import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto, UpdateAddressDto } from '../shared/dto/address.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt.strategy';

@Controller('addresses')
@UseGuards(JwtAuthGuard)
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  async findAll(@Request() req: any) {
    return this.addressesService.findAllByUser(req.user.userId);
  }

  @Post()
  async create(@Request() req: any, @Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(req.user.userId, createAddressDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Request() req: any, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(id, req.user.userId, updateAddressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    return this.addressesService.remove(id, req.user.userId);
  }
}