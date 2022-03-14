import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';
import { DiscordUserDto } from './dto/user.dto';

@Injectable()
export class DiscordService {

  constructor(
    private readonly _httpService: HttpService,
    @Inject(REQUEST) private readonly _request?: Request,
  ) {}

  /**
   * Gets the discord user
   */
  async getDiscordIdentity() {
    const accessToken = this._request.user;
    if (!accessToken) {
      throw new UnauthorizedException('No access token provided');
    }
    const { data } = await lastValueFrom(this._httpService.get<DiscordUserDto>('https://discordapp.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }));
    return data;
  }



}
