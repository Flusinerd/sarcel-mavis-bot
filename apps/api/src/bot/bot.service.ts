import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, Guild, Intents, Interaction } from 'discord.js';
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { OtonCommands } from './oton-commands';
import { FilesService } from '../files/files.service';
import { AudioPlayer, createAudioPlayer, createAudioResource, joinVoiceChannel } from '@discordjs/voice';
import { AudioFilesService } from '../audio-files/audio-files.service';
import { PresenceCommands } from './presence-commands';

@Injectable()
export class BotService {
  private logger = new Logger(BotService.name);
  private readonly _clientId: string;
  private readonly _guildId: string;

  private rest?: REST;
  private client?: Client;

  private _player = createAudioPlayer();

  private _commands: {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
    execute: (interaction: Interaction,
              guild: Guild,
              filesService: FilesService,
              player: AudioPlayer,
              otonService: AudioFilesService
    ) => Promise<void>
  }[] = [];

  constructor(private readonly _config: ConfigService, private readonly _filesService: FilesService, private readonly _audioFilesService: AudioFilesService) {
    const token = this._config.get('DISCORD_TOKEN');
    const clientId = this._config.get('DISCORD_CLIENT_ID');
    const guildId = this._config.get('DISCORD_GUILD_ID');
    this.rest = new REST();
    if (!token) {
      this.logger.error('No DISCORD_TOKEN found');
      return;
    }
    if (!clientId) {
      this.logger.error('No DISCORD_CLIENT_ID found');
      return;
    }
    if (!guildId) {
      this.logger.error('No DISCORD_GUILD_ID found');
      return;
    }
    this._clientId = clientId;
    this._guildId = guildId;
    this._commands = this._commands.concat(new OtonCommands().commands);
    this._commands = this._commands.concat(new PresenceCommands().commands);
    // noinspection JSIgnoredPromiseFromCall
    this._start(token);
  }

  private async _start(token: string) {
    this.rest.setToken(token);
    this.client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES]
    });

    this.client.on('ready', () => {
      this.logger.log('Bot is ready');
      this._registerSlashCommands();
    });

    await this.client.login(token);
  }

  private async _registerSlashCommands() {
    await this.rest.put(Routes.applicationGuildCommands(this._clientId, this._guildId), {
      body: this._commands.map(c => c.data.toJSON())
    });

    this.client.on('interactionCreate', this._interactionListener.bind(this));
    this.logger.log('Slash commands registered');
  }

  private async _interactionListener(interaction: Interaction) {
    if (!interaction.isCommand()) {
      return;
    }

    const command = this._commands.find(c => c.data.name === interaction.commandName);
    if (!command) {
      this.logger.warn('Unknown command', interaction.commandName);
      return;
    }
    await command.execute(interaction, this.client.guilds.cache.get(this._guildId) as Guild, this._filesService, this._player, this._audioFilesService);
  }

  public async playSound(id: string, userId: string) {
    const sound = await this._audioFilesService.getOne(id);
    if (!sound) {
      throw new NotFoundException(`Sound with id ${id} not found`);
    };

    const stream = await this._filesService.getFile(sound.key);
    const resource = createAudioResource(stream);
    // Join the voice channel of the user
    const guild = this.client.guilds.cache.get(this._guildId);
    const voiceChannel = guild.members.cache.get(userId).voice.channel;
    if (!voiceChannel) {
      throw new BadRequestException('User is not in a voice channel');
    }
    joinVoiceChannel({
      selfDeaf: false,
      guildId: this._guildId,
      adapterCreator: guild.voiceAdapterCreator,
      channelId: voiceChannel.id,
    }).subscribe(this._player);

    this._player.play(resource);
  }

}
