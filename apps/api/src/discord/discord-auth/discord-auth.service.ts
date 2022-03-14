import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DiscordTokenExchangeRequestDto } from './dto/discord/token-exchange-request.dto';
import { ConfigService } from '@nestjs/config';
import { TokenExchangeRequestDto } from './dto/token-exchange-request.dto';
import { AccessTokenResponseDto } from './dto/discord/access-token-response.dto';
import { catchError, Observable, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { URLSearchParams} from 'url';
import { RefreshTokenRequestDto } from './dto/refresh-token.dto';
import { DiscordRefreshTokenRequestDto } from './dto/discord/refresh-token-request.dto';

@Injectable()
export class DiscordAuthService {
  private readonly client_id: string;
  private readonly client_secret: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.client_id = this.configService.get('DISCORD_CLIENT_ID');
    this.client_secret = this.configService.get('DISCORD_CLIENT_SECRET');
    if (!this.client_id) {
      throw new Error('DISCORD_CLIENT_ID is not defined');
    }
    if (!this.client_secret) {
      throw new Error('DISCORD_CLIENT_SECRET is not defined');
    }
  }

  exchangeToken(
    request: TokenExchangeRequestDto
  ): Observable<AxiosResponse<AccessTokenResponseDto>> {
    const url = 'https://discord.com/api/oauth2/token';
    const body = new DiscordTokenExchangeRequestDto(
      request.code,
      request.redirect_uri,
      this.client_id,
      this.client_secret
    );

    const params = new URLSearchParams()
    params.append('grant_type', 'authorization_code');
    params.append('code', body.code);
    params.append('redirect_uri', body.redirect_uri);
    params.append('client_id', body.client_id);
    params.append('client_secret', body.client_secret);

    return this.httpService
      .post<AccessTokenResponseDto>(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
  }

  refreshToken(
    request: RefreshTokenRequestDto
  ) {
    const url = 'https://discord.com/api/v9/oauth2/token';
    const body = new DiscordRefreshTokenRequestDto(
      request.refreshToken,
      this.client_id,
      this.client_secret
    );

    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', body.refresh_token);
    params.append('client_id', body.client_id);
    params.append('client_secret', body.client_secret);

    return this.httpService
      .post<AccessTokenResponseDto>(url, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).pipe(
        catchError(error => {
          console.log(error);
          return throwError(error);
        })
      )
  }
}
