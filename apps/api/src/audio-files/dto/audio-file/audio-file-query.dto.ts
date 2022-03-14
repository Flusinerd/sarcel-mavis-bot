import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

export class AudioFileQueryDto {
  @ApiPropertyOptional({default: false})
  @Transform(value => value.value === 'true')
  @IsBoolean()
  @IsOptional()
  readonly withCategories: boolean;
}

export class ManyAudioFileQueryDto extends AudioFileQueryDto {
  @ApiPropertyOptional()
  @IsUUID('4')
  @IsOptional()
  readonly categoryId: string;
}
