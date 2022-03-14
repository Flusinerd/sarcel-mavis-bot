import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AccessTokenResponseDto {
  @ApiProperty({
    description: 'The access token',
  })
  @IsString()
  access_token: string;

  @ApiProperty({
    description: 'The token type',
    example: 'Bearer',
  })
  @IsString()
  token_type: string;

  @ApiProperty({
    description: 'The time in seconds until the access token expires',
    example: 3600,
  })
  @IsInt()
  expires_in: number;

  @ApiProperty({
    description: 'The refresh token',
  })
  @IsString()
  refresh_token: string;

  @ApiProperty({
    description: 'A space delimited list of scopes. See https://discordapp.com/developers/docs/topics/oauth2#scopes',
    example: 'identify',
  })
  @IsString()
  scope: string;
}
