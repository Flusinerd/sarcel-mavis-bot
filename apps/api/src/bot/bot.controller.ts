import { Body, Controller, Post, Req, Sse, UnauthorizedException } from '@nestjs/common';
import { BotService } from './bot.service';
import { PlaySoundDto } from './dto/play-sound.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { DiscordService } from '../discord/discord.service';

@Controller('discord/bot')
@ApiTags('Bot')
export class BotController {

  constructor(
    private readonly _botService: BotService,
    private readonly _discordService: DiscordService
  ) {
  }

  @Post()
  @ApiOperation({ description: 'Plays the provided sound', operationId: 'playSound' })
  async playSound(@Body() body: PlaySoundDto, @Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    const user = await this._discordService.getDiscordIdentity();
    return this._botService.playSound(body.soundId, user.id);
  }

  @Post('pause')
  @ApiOperation({ description: 'Pauses the currently playing sound', operationId: 'pauseSound' })
  async pauseSound(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    const user = await this._discordService.getDiscordIdentity();
    return this._botService.pauseSound(user.id);
  }

  @Post('resume')
  @ApiOperation({ description: 'Resumes the currently playing sound', operationId: 'resumeSound' })
  async resumeSound(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    const user = await this._discordService.getDiscordIdentity();
    return this._botService.resumeSound(user.id);
  }

  @Post('stop')
  @ApiOperation({ description: 'Stops the currently playing sound', operationId: 'stopSound' })
  async stopSound(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    const user = await this._discordService.getDiscordIdentity();
    return this._botService.stopSound(user.id);
  }

  @Sse('status')
  botStatus() {
    return this._botService.$botStatus;
  }

}
