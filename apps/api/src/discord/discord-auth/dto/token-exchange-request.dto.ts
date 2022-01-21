import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class TokenExchangeRequestDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsUrl({require_tld: false})
  redirect_uri: string;
}
