import { Component, ViewEncapsulation } from '@angular/core';
import { LoadingService } from './loading.service';

@Component({
  selector: 'sarcel-mavis-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoadingComponent {

  constructor(
    public readonly loadingService: LoadingService
  ) { }

}
