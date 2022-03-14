import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { AudioFilesService } from './audio-files.service';
import { CreateAudioFileDto } from './dto/audio-file/audio-file-create.dto';
import { AudioFileQueryDto, ManyAudioFileQueryDto } from './dto/audio-file/audio-file-query.dto';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { AudioFileDto } from './dto/audio-file/audio-file.dto';

@Controller('audio-files')
@ApiTags('Audio Files')
export class AudioFilesController {

  constructor(
    private readonly audioFilesService: AudioFilesService,
  ) {}

  @Post()
  @ApiOperation({ description: 'Create a new audio file', operationId: 'createAudioFile' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new audio file',
    type: CreateAudioFileDto,
  })
  @FormDataRequest()
  // @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Body() body: CreateAudioFileDto) {
    // console.log(file);
    // console.log(body);
    return this.audioFilesService.create(body);
  }

  @Get()
  @ApiOperation({ description: 'Get all audio files', operationId: 'getAllAudioFiles' })
  @ApiConsumes('application/json')
  @ApiOkResponse({ description: 'Audio Files', type: AudioFileDto, isArray: true })
  async findAll(@Query() query?: ManyAudioFileQueryDto) {
    if (query && query.categoryId) {
      return this.audioFilesService.getAllByCategoryId(query.categoryId, query.withCategories);
    }
    return this.audioFilesService.getAll(query.withCategories);
  }

  @Get(':id')
  @ApiOperation({ description: 'Get an audio file by id', operationId: 'getAudioFileById' })
  async findOne(@Param('id') id: string, @Query() query?: AudioFileQueryDto) {
    const result = await this.audioFilesService.getOne(id, query.withCategories);
    if (!result) {
      throw new NotFoundException('Audio file not found');
    }
    return result;
  }

  @Get(':id/url')
  @ApiOperation({ description: 'Get an audio file url by id', operationId: 'getAudioFileUrlById' })
  async getAudioFileUrl(@Param('id') id: string) {
    const result = await this.audioFilesService.getAudioFileUrl(id);
    if (!result) {
      throw new NotFoundException('Audio file not found');
    }
    return result;
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete an audio file', operationId: 'deleteAudioFile' })
  async delete(@Param('id') id: string) {
    return this.audioFilesService.delete(id);
  }
}
