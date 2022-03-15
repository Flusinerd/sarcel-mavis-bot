import { TestBed } from '@angular/core/testing';

import { BotStatusService } from './bot-status.service';

describe('BotStatusService', () => {
  let service: BotStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
