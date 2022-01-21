import { Test, TestingModule } from '@nestjs/testing';
import { DiscordAuthService } from './discord-auth.service';

describe('DiscordAuthService', () => {
  let service: DiscordAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscordAuthService],
    }).compile();

    service = module.get<DiscordAuthService>(DiscordAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
