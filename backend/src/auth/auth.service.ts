import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto, UserResponseDto } from '../shared/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthTokenDto } from '../shared/dto/token.dto';
import { hashPassword, comparePassword, generateToken, verifyToken, generateUuid } from '../shared/utils';
import { AUTH_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../shared/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = hashPassword(createUserDto.password);
    const user = await this.usersService.create({
      ...createUserDto,
      passwordHash,
    });

    return this.toUserResponse(user);
  }

  async login(loginDto: LoginDto): Promise<AuthTokenDto> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user || !comparePassword(loginDto.password, user.passwordHash)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user.id, user.email, user.role);
  }

  async refresh(refreshToken: string): Promise<AuthTokenDto> {
    const decoded = verifyToken(refreshToken, process.env.JWT_SECRET || 'supersecretjwtkey');
    if (!decoded || typeof decoded === 'boolean') {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findById(decoded.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return this.generateTokens(user.id, user.email, user.role);
  }

  async getProfile(userId: string): Promise<UserResponseDto> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.toUserResponse(user);
  }

  private generateTokens(userId: string, email: string, role: string): AuthTokenDto {
    const secret = process.env.JWT_SECRET || 'supersecretjwtkey';

    const accessToken = this.jwtService.sign({
      sub: userId,
      email,
      role,
    });

    const refreshToken = generateToken(
      { sub: userId, type: 'refresh' },
      secret,
      REFRESH_TOKEN_EXPIRY,
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: AUTH_TOKEN_EXPIRY,
    };
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