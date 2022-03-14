import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { DiscordModule } from '../discord/discord.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccessTokenMiddleware } from '../access-token.middleware';
import { AudioFilesModule } from '../audio-files/audio-files.module';
import { BotModule } from '../bot/bot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DATABASE'),
        entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    DiscordModule,
    AudioFilesModule,
    BotModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessTokenMiddleware)
      .forRoutes('discord');
  }

}
