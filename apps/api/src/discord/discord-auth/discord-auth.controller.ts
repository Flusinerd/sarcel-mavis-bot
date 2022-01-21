import { Body, Controller, Post } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';
import { DiscordAuthService } from './discord-auth.service';
import { AccessTokenResponseDto } from './dto/discord/access-token-response.dto';
import { TokenExchangeRequestDto } from './dto/token-exchange-request.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('discord/auth')
@ApiTags('discord', 'auth')
export class DiscordAuthController {
  constructor(private readonly discordAuthService: DiscordAuthService) {}

  @Post('token')
  @ApiCreatedResponse({
    type: AccessTokenResponseDto,
  })
  @ApiOperation({ summary: 'Exchange a Discord OAuth2 code for an access token', operationId: 'exchangeToken' })
  exchangeToken(
    @Body() request: TokenExchangeRequestDto
  ): Observable<AccessTokenResponseDto> {
    return this.discordAuthService.exchangeToken(request).pipe(catchError(() => {
      throw new Error('Failed to exchange token');
    })).pipe(map(response => response.data));
  }
}
