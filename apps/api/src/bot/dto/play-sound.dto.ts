import { ApiProperty } from '@nestjs/swagger';

export class PlaySoundDto {
  @ApiProperty()
  soundId: string;

  @ApiProperty()
  userId: string;
}
