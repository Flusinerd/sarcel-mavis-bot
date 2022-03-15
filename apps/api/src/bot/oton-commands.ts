import { SlashCommandBuilder } from '@discordjs/builders';
import { Guild, Interaction } from 'discord.js';
import { FilesService } from '../files/files.service';
import { AudioPlayer, createAudioResource, joinVoiceChannel } from '@discordjs/voice';
import { AudioFilesService } from '../audio-files/audio-files.service';
import { AudioFileDto } from '../audio-files/dto/audio-file/audio-file.dto';

export class OtonCommands {
  static lastPlayed?: string;

  commands = [
    {
      data: new SlashCommandBuilder()
        .setName('oton')
        .setDescription('Plays a (random) O-Ton')
        .addSubcommand(command =>
          command.setName('list')
            .setDescription('Lists all available O-Tons')
        )
        .addSubcommand(command =>
          command.setName('play')
            .setDescription('Plays a (random) O-Ton')
            .addStringOption(option =>
              option.setName('file')
                .setDescription('The file to play')
                .setRequired(false)
            )
        )
      ,
      async execute(interaction: Interaction, guild: Guild, filesService: FilesService, player: AudioPlayer, otonService: AudioFilesService) {
        if (!interaction.isCommand()) {
          return;
        }
        if (!interaction.isCommand()) {
          return;
        }

        const files = await otonService.getAll();
        if (interaction.options.getSubcommand() === 'list') {
          const list = files.map(file => `**${file.name}**`).join('\n');
          await interaction.reply(`Available O-Tons:\n${list}`);
          return;
        }

        // Get the author of the message
        const author = guild.members.resolve(interaction.member.user.id);
        if (!author) {
          return;
        }

        // Get the voice channel of the author
        const voiceChannel = author.voice.channel;
        if (!voiceChannel) {
          return;
        }

        // Check if a file was specified
        const fileOption = interaction.options.getString('file');
        let fileToPlay: AudioFileDto;
        if (!fileOption) {
          // Get a random file
          // Pick a random file, that is not the last played file
          let isSameFile = false;
          do {
            fileToPlay = files[Math.floor(Math.random() * files.length)];
            isSameFile = fileToPlay.name === OtonCommands.lastPlayed;
          } while (isSameFile);
        } else {
          // Get the file specified
          fileToPlay = files.find(file => file.name === fileOption);
        }

        const file = await filesService.getFileUrl(fileToPlay.key);

        const resource = createAudioResource(file, {
          inlineVolume: true
        });

        resource.volume.setVolume(0.8);
        joinVoiceChannel({
          channelId: voiceChannel.id,
          guildId: guild.id,
          adapterCreator: guild.voiceAdapterCreator,
          selfDeaf: false
        }).subscribe(player);

        player.play(resource);

        await interaction.reply(`Playing **${fileToPlay.name}**`);
      }
    },
    {
      data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the O-Ton'),
      async execute(interaction: Interaction, guild: Guild, filesService: FilesService, player: AudioPlayer) {
        if (!interaction.isCommand()) {
          return;
        }

        // Check if the user is in a voice channel
        const author = guild.members.resolve(interaction.member.user.id);
        if (!author) {
          return;
        }

        const voiceChannel = author.voice.channel;
        if (!voiceChannel) {
          return;
        }

        player.stop();


        await interaction.reply('Stopped!');
      }
    },
    {
      data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the O-Ton'),
      async execute(interaction: Interaction, guild: Guild, filesService: FilesService, player: AudioPlayer) {
        if (!interaction.isCommand()) {
          return;
        }

        // Check if the user is in a voice channel
        const author = guild.members.resolve(interaction.member.user.id);
        if (!author) {
          return;
        }

        const voiceChannel = author.voice.channel;
        if (!voiceChannel) {
          return;
        }

        player.pause();

        await interaction.reply('Paused!');
      }
    },
    {
      data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes the O-Ton'),
      async execute(interaction: Interaction, guild: Guild, filesService: FilesService, player: AudioPlayer) {
        if (!interaction.isCommand()) {
          return;
        }

        // Check if the user is in a voice channel
        const author = guild.members.resolve(interaction.member.user.id);
        if (!author) {
          return;
        }

        const voiceChannel = author.voice.channel;
        if (!voiceChannel) {
          return;
        }

        player.unpause();

        await interaction.reply('Resumed!');
      }
    }
  ];
}
