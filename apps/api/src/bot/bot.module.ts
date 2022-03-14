import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { FilesModule } from '../files/files.module';
import { AudioFilesModule } from '../audio-files/audio-files.module';
import { BotController } from './bot.controller';

@Module({
  providers: [BotService],
  imports: [FilesModule, AudioFilesModule],
  controllers: [BotController],
})
export class BotModule {}
