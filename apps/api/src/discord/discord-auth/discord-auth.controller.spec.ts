import { Test, TestingModule } from '@nestjs/testing';
import { DiscordAuthController } from './discord-auth.controller';

describe('DiscordAuthController', () => {
  let controller: DiscordAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscordAuthController],
    }).compile();

    controller = module.get<DiscordAuthController>(DiscordAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
