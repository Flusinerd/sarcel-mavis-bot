import { SlashCommandBuilder } from '@discordjs/builders';
import { Guild, Interaction } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';

export class PresenceCommands {
  commands = [{
    data: new SlashCommandBuilder()
      .setName('leave')
      .setDescription('Leaves the voice channel'),
    async execute(interaction: Interaction, guild: Guild) {
      if (!interaction.isCommand()) {
        return;
      }

      const voiceChannel = getVoiceConnection(guild.id);

      if (!voiceChannel) {
        await interaction.reply('I am not in a voice channel');
        return;
      }

      voiceChannel.disconnect();

      await interaction.reply('Left voice channel');
    },
  }]
}
