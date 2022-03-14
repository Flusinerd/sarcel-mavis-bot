import { ApiProperty } from '@nestjs/swagger';

export abstract class FileDto {
  @ApiProperty( )
  id: string;

  @ApiProperty( {
    description: 'File name with extension',
    example: 'file.jpg',
  } )
  name: string;

  @ApiProperty({
    description: 'AWS S3 key of file'
  })
  key: string;
}
