import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AudioFilesService } from '../audio-files.service';
import { CreateAudioFileCategoryDto } from '../dto/audio-file-category/audio-file-category-create.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AudioFileCategoryDto } from '../dto/audio-file-category/audio-file-category.dto';
import { AudioFileCategoryUpdateDto } from '../dto/audio-file-category/audio-file-category-update.dto';

@Controller('audio-files/categories')
@ApiTags('Audio Files Categories', 'Audio Files')
export class AudioFilesCategoriesController {

  constructor(
    private readonly _audioFilesService: AudioFilesService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new audio file category', operationId: 'createAudioFileCategory' })
  @ApiCreatedResponse({ description: 'The audio file category has been created', type: AudioFileCategoryDto })
  async createCategory(@Body() body: CreateAudioFileCategoryDto) {
    return await this._audioFilesService.createCategory(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all audio file categories', operationId: 'getAllAudioFileCategories' })
  @ApiOkResponse({ description: 'All audio file categories', type: AudioFileCategoryDto, isArray: true })
  async getCategories() {
    return await this._audioFilesService.getCategories();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an audio file category', operationId: 'updateAudioFileCategory' })
  @ApiOkResponse({ description: 'The audio file category has been updated', type: AudioFileCategoryDto })
  async updateCategory(@Body() body: AudioFileCategoryUpdateDto, @Param('id') id: string) {
    return await this._audioFilesService.updateCategory(id, body);
  }
}
