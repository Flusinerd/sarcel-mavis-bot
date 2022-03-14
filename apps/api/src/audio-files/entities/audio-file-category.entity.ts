import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AudioFileEntity } from './audio-file.entity';

@Entity('audio_file_categories')
export class AudioFileCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  description?: string;

  @ManyToMany(() => AudioFileEntity, audioFile => audioFile.audioFileCategories)
  audioFiles?: AudioFileEntity[];
}
