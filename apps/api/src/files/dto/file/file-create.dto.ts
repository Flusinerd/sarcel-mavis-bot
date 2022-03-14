import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsFile, MemoryStoredFile } from 'nestjs-form-data';

export abstract class CreateFileDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, format: 'binary' })
  @IsFile()
  file: MemoryStoredFile;
}
