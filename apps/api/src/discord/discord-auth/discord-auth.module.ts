import { Module } from '@nestjs/common';
import { DiscordAuthService } from './discord-auth.service';
import { DiscordAuthController } from './discord-auth.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [DiscordAuthService],
  controllers: [DiscordAuthController],
  imports: [HttpModule],
})
export class DiscordAuthModule {}
