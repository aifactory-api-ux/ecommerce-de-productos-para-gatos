import { Controller, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from '../shared/dto/user.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt.strategy';
import { AdminOnly } from '../shared/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @AdminOnly()
  async findAll() {
    return this.usersService.findAll();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @AdminOnly()
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}