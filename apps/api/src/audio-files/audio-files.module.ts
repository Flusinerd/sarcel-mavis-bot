import { Module } from '@nestjs/common';
import { AudioFilesService } from './audio-files.service';
import { FilesModule } from '../files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioFileEntity } from './entities/audio-file.entity';
import { AudioFilesController } from './audio-files.controller';
import { AudioFilesCategoriesController } from './audio-files-categories/audio-files-categories.controller';
import { AudioFileCategoryEntity } from './entities/audio-file-category.entity';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  providers: [AudioFilesService],
  imports: [FilesModule, TypeOrmModule.forFeature([AudioFileEntity, AudioFileCategoryEntity]), NestjsFormDataModule],
  controllers: [AudioFilesCategoriesController, AudioFilesController],
  exports: [AudioFilesService],
})
export class AudioFilesModule {}
