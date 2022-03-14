import { Directive, HostBinding } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { delayWhen, interval } from 'rxjs';

@Directive({
  selector: '[sarcelMavisSidebarStatus]'
})
export class SidebarStatusDirective {
  public readonly delayedClass = this._delayedClass();
  protected applyClass = true;

  constructor(
    readonly sidebarService: SidebarService
  ) {
  }

  @HostBinding('class.sidebar-closed')
  get closedClass() {
    if (!this.applyClass) {
      return false;
    }
    return this.sidebarService.isClosed;
  }

  private _delayedClass() {
    return this.sidebarService.$isClosed
      .pipe(delayWhen((val) => val ? interval(0) : interval(200)));
  }

}
