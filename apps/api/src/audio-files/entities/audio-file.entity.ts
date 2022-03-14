import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { FileEntity } from '../../files/entities/File.entity';
import { AudioFileCategoryEntity } from './audio-file-category.entity';

@Entity('audio_files')
export class AudioFileEntity extends FileEntity {

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: true,
  })
  command?: string;

  @ManyToMany(() => AudioFileCategoryEntity, audioFileCategories => audioFileCategories.audioFiles)
  @JoinTable({
    name: 'audio_files_categories',
    joinColumn: {
      name: 'audio_file_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'audio_file_category_id',
      referencedColumnName: 'id',
    },
  })
  audioFileCategories?: AudioFileCategoryEntity[];
}
