import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AccessTokenResponseDto {
  @ApiProperty()
  @IsString()
  access_token: string;

  @ApiProperty()
  @IsString()
  token_type: string;

  @ApiProperty()
  @IsInt()
  expires_in: number;

  @ApiProperty()
  @IsString()
  refresh_token: string;

  @ApiProperty()
  @IsString()
  scope: string;
}
