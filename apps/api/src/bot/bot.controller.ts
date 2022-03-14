import { Body, Controller, Post } from '@nestjs/common';
import { BotService } from './bot.service';
import { PlaySoundDto } from './dto/play-sound.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('bot')
@ApiTags('Bot')
export class BotController {

  constructor(
    private readonly _botService: BotService
  ) {
  }

  @Post()
  @ApiOperation({ description: 'Plays the provided sound', operationId: 'playSound' })
  playSound(@Body() body: PlaySoundDto) {
    return this._botService.playSound(body.soundId, body.userId);
  }

}
