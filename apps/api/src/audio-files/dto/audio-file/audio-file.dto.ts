import { FileDto } from '../../../files/dto/file/file.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AudioFileCategoryDto } from '../audio-file-category/audio-file-category.dto';

export class AudioFileDto extends FileDto {
  @ApiPropertyOptional(
    { type: () => AudioFileCategoryDto, description: 'Audio file categories', isArray: true },
  )
  audioFileCategories?: AudioFileCategoryDto[];

  @ApiPropertyOptional({ description: 'Audio file command' })
  command?: string;
}
