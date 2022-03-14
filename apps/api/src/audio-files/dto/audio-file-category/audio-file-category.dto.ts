import { AudioFileDto } from '../audio-file/audio-file.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AudioFileCategoryDto {
  @ApiProperty({
    description: 'The unique identifier of the audio file category.',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the category',
    example: 'Music',
  })
  name: string;

  @ApiProperty(
    {
      description: 'Description of the audio file category',
      example: 'This is a category for a specific type of audio file',
    }
  )
  description?: string;

  @ApiPropertyOptional({ type: () => AudioFileDto, isArray: true })
  audioFiles?: AudioFileDto[];
}
