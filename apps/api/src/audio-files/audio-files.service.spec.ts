import { Test, TestingModule } from '@nestjs/testing';
import { AudioFilesService } from './audio-files.service';

describe('AudioFilesService', () => {
  let service: AudioFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AudioFilesService],
    }).compile();

    service = module.get<AudioFilesService>(AudioFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
