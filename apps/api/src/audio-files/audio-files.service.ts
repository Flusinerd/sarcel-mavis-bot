import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioFileEntity } from './entities/audio-file.entity';
import { getConnection, In, QueryFailedError, Repository } from 'typeorm';
import { CreateAudioFileDto } from './dto/audio-file/audio-file-create.dto';
import { DatabaseError } from 'pg-protocol';
import { AudioFileCategoryEntity } from './entities/audio-file-category.entity';
import { FilesService } from '../files/files.service';
import { AudioFileDto } from './dto/audio-file/audio-file.dto';
import { AudioFileCategoryDto } from './dto/audio-file-category/audio-file-category.dto';
import { CreateAudioFileCategoryDto } from './dto/audio-file-category/audio-file-category-create.dto';
import { AudioFileCategoryUpdateDto } from './dto/audio-file-category/audio-file-category-update.dto';

@Injectable()
export class AudioFilesService {

  constructor(
    @InjectRepository(AudioFileEntity)
    private readonly _audioFileRepository: Repository<AudioFileEntity>,
    @InjectRepository(AudioFileCategoryEntity)
    private readonly _audioFileCategoryRepository: Repository<AudioFileCategoryEntity>,
    private readonly _filesService: FilesService
  ) {
  }

  async create(
    fileData: CreateAudioFileDto)
    : Promise<AudioFileDto> {

    const runner = await getConnection().createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    const manager = runner.manager;

    const categoryIDs = fileData.categoryIds;
    console.log(categoryIDs);

    const audioFile = manager.create(AudioFileEntity, fileData);
    const categories = await manager.find(AudioFileCategoryEntity, {
      where: {
        id: In(categoryIDs)
      }
    });

    if (categories.length !== categoryIDs.length) {
      // Get the IDs of the categories that were not found
      const notFoundIDs = categoryIDs.filter(id => !categories.find(category => category.id === id));
      throw new ConflictException(`The following category IDs were not found: ${notFoundIDs.join(', ')}`);
    }

    try {
      // Upload file to S3
      // Set file url and key
      audioFile.key = await this._filesService.uploadFile(fileData.file.buffer, fileData.file.originalName);
      audioFile.audioFileCategories = categories;
      await manager.save(AudioFileEntity, audioFile);
      await runner.commitTransaction();

      return manager.findOne(AudioFileEntity, audioFile.id);
    } catch (error) {
      // Rollback transaction
      await runner.rollbackTransaction();
      if (error instanceof QueryFailedError) {
        const err = error as unknown as DatabaseError;
        if (err.code === '23505') {
          throw new ConflictException('Audio file already exists');
        }
        // If its a foreign key constraint error, throw a conflict exception
        if (err.code === '23503') {
          throw new ConflictException('There was a problem with saving the category');
        }


      }
      throw error;
    }

  }

  async getAll(includeCategories= false): Promise<AudioFileDto[]> {
    const query = this._audioFileRepository.createQueryBuilder('audio_file');
    if (includeCategories) {
      query.leftJoinAndSelect('audio_file.audioFileCategories', 'audio_file_category');
    }
    return query.getMany();
  }

  async getAllByCategoryId(categoryId: string, includeCategories = false): Promise<AudioFileDto[]> {
    const query = this._audioFileRepository.createQueryBuilder('audio_file');
    if (includeCategories) {
      query.leftJoinAndSelect('audio_file.audioFileCategories', 'audio_file_category');
    }
    return query.where('audio_file.audioFileCategories.id = :categoryId', {categoryId}).getMany();
  }

  getCategories(): Promise<AudioFileCategoryDto[]> {
    console.log('Getting categories');
    return this._audioFileCategoryRepository.find();
  }

  createCategory(category: CreateAudioFileCategoryDto): Promise<AudioFileCategoryDto> {
    return this._audioFileCategoryRepository.save(category);
  }

  getOne(id: string, withCategories = false): Promise<AudioFileDto> {
    const query = this._audioFileRepository.createQueryBuilder('audio_file');
    if (withCategories) {
      query.leftJoinAndSelect('audio_file.audioFileCategories', 'audio_file_category');
    }
    return query.where('audio_file.id = :id', {id}).getOne();
  }

  async delete(id: string): Promise<void> {
    const runner = await getConnection().createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    const manager = runner.manager;

    const audioFile = await manager.findOne(AudioFileEntity, id);
    if (!audioFile) {
      await runner.rollbackTransaction();
      throw new NotFoundException('Audio file not found');
    }

    try {
      await this._filesService.deleteFile(audioFile.key);
      await manager.delete(AudioFileEntity, audioFile);
      await runner.commitTransaction();
    } catch (error) {
      await runner.rollbackTransaction();
      throw error;
    }
  }

  async getAudioFileUrl(id: string): Promise<string> {
    const audioFile = await this._audioFileRepository.findOne(id);
    if (!audioFile) {
      throw new NotFoundException('Audio file not found');
    }
    return this._filesService.getFileUrl(audioFile.key);
  }

  async updateCategory(id: string, update: AudioFileCategoryUpdateDto) {
    const category = await this._audioFileCategoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return this._audioFileCategoryRepository.save({id, ...update});
  }
}
