import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateFileDto } from '../../../files/dto/file/file-create.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAudioFileDto extends CreateFileDto{
  @ApiProperty({
    type: String,
    isArray: true,
    description: 'UUIDs of the categores to which the audio file belongs',
  })
  @Transform((value) => {
    if (typeof value.value === 'string') {
      value.value = value.value.split(',');
      return value.value;
    }
    return value.value;
  })
  @IsUUID('4', { each: true })
  categoryIds: string[];

  @ApiPropertyOptional({ description: 'Audio file command' })
  @IsString()
  @IsOptional()
  command?: string;
}
