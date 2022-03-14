import { Test, TestingModule } from '@nestjs/testing';
import { AudioFilesCategoriesController } from './audio-files-categories.controller';

describe('AudioFilesCategoriesController', () => {
  let controller: AudioFilesCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AudioFilesCategoriesController],
    }).compile();

    controller = module.get<AudioFilesCategoriesController>(
      AudioFilesCategoriesController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
