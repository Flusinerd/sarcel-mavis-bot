import { Controller, Get } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DiscordUserDto } from './dto/user.dto';

@Controller('discord')
@ApiTags('Discord')
export class DiscordController {

  constructor(
    private readonly discordService: DiscordService,
  ) {}

  @Get('identity')
  @ApiTags('Identity')
  @ApiOperation({ summary: 'Gets the users identity data', operationId: 'getIdentity' })
  @ApiOkResponse({ description: 'Returns the users identity data', type: DiscordUserDto })
  async getIdentity() {
    return await this.discordService.getDiscordIdentity();
  }

}
