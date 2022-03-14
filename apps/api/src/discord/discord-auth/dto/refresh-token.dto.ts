import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenRequestDto {
  @ApiProperty({
    description: 'The refresh token',
  })
  @IsString()
  refreshToken: string;
}
