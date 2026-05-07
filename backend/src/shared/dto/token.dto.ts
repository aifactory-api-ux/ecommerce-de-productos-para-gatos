import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

export class AuthTokenDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}