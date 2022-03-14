import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DiscordUserDto{
  @ApiProperty({
    description: 'Discord User ID',
    example: '123456789012345678',
  })
  id: string;

  @ApiProperty({
    description: 'Discord User Username',
    example: 'username',
  })
  username: string;

  @ApiProperty({
    description: 'Discord User Discriminator',
    example: '1234',
  })
  discriminator: string;

  @ApiProperty({
    description: 'Discord User Avatar Hash',
    example: '123456789012345678',
  })
  avatar: string;

  @ApiPropertyOptional({
    description: 'Whether the user is a bot',
    example: true,
  })
  bot?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the user is a official Discord system user',
    example: true,
  })
  system?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the user has two factor enabled',
    example: true,
  })
  mfa_enabled?: boolean;

  @ApiPropertyOptional({
    description: 'The user\'s banner hash',
    example: '123456789012345678',
  })
  banner?: string;

  @ApiPropertyOptional({
    description: 'the user\'s banner color encoded as a integer representing a hexadecimal value',
    example: '16777215',
  })
  accent_color?: number;

  @ApiPropertyOptional({
    description: 'The user\'s locale',
    example: 'en-US',
  })
  locale?: string;

  @ApiPropertyOptional({
    description: 'The user\'s flags',
    example: 0,
  })
  flags?: number;

  @ApiPropertyOptional({
    description: 'The user\'s premium type',
    example: 0,
  })
  premium_type?: number;

  @ApiPropertyOptional({
    description: 'The user\'s public flags',
    example: 0,
  })
  public_flags?: number;
}
