import { Module } from '@nestjs/common';
import { DiscordAuthModule } from './discord-auth/discord-auth.module';
import { DiscordService } from './discord.service';
import { DiscordController } from './discord.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DiscordAuthModule, HttpModule],
  providers: [DiscordService],
  controllers: [
    DiscordController
  ],
})
export class DiscordModule {}
