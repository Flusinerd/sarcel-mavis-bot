import { Module } from '@nestjs/common';
import { DiscordAuthModule } from './discord-auth/discord-auth.module';

@Module({
  imports: [DiscordAuthModule],
})
export class DiscordModule {}
