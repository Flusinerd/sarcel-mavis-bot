import { Body, Controller, Post, Res } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { DiscordAuthService } from './discord-auth.service';
import { AccessTokenResponseDto } from './dto/discord/access-token-response.dto';
import { TokenExchangeRequestDto } from './dto/token-exchange-request.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RefreshTokenRequestDto } from './dto/refresh-token.dto';

@Controller('discord/auth')
@ApiTags('Discord', 'Auth')
export class DiscordAuthController {
  constructor(private readonly discordAuthService: DiscordAuthService) {}

  @Post('token')
  @ApiCreatedResponse({
    type: AccessTokenResponseDto,
  })
  @ApiOperation({ summary: 'Exchange a Discord OAuth2 code for an access token', operationId: 'exchangeToken' })
  async exchangeToken(
    @Body() request: TokenExchangeRequestDto,
    @Res() response: Response
  ): Promise<void>{
    console.log(request);
    const tokenResult = await lastValueFrom(this.discordAuthService.exchangeToken(request));
    response.cookie('access_token', tokenResult.data.access_token, {
      maxAge: tokenResult.data.expires_in * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    response.send(tokenResult.data);
  }

  @Post('token/refresh')
  @ApiCreatedResponse({
    type: AccessTokenResponseDto,
  })
  @ApiOperation({ summary: 'Refresh a Discord OAuth2 access token', operationId: 'refreshToken' })
  async refreshToken(
    @Body() request: RefreshTokenRequestDto,
    @Res() response: Response
  ): Promise<void> {
    const tokenResult = await lastValueFrom(this.discordAuthService.refreshToken(request));
    response.cookie('access_token', tokenResult.data.access_token, {
      maxAge: tokenResult.data.expires_in * 1000,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    response.send(tokenResult.data);
  }
}
