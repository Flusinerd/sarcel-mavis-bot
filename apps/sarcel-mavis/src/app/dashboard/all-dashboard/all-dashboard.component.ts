import { Component, ViewEncapsulation } from '@angular/core';
import { DashboardDirective } from '../dashboard.directive';
import { AudioFilesService } from '../../api/services/audio-files.service';
import { BotService } from '../../api/services/bot.service';

@Component({
  selector: 'sarcel-mavis-all-dashboard',
  templateUrl: './all-dashboard.component.html',
  styleUrls: ['./all-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AllDashboardComponent extends DashboardDirective{

  constructor(
    _audioFileService: AudioFilesService,
    _botService: BotService
  ) {
    super(_audioFileService, _botService);
  }

}
