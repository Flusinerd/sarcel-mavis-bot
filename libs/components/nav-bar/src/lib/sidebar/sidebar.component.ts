import {
  AfterContentInit, ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  HostBinding, HostListener,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { SidebarHeaderComponent } from './sidebar-header/sidebar-header.component';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'sarcel-mavis-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SidebarComponent {
  @Input()
  set closed(value: boolean) {
    this.sidebarService.isClosed = value;
  }

  onMouseEnter() {
    if (this.sidebarService.isClosed) {
      this.sidebarService.isOpenedByHover = true;
      this.sidebarService.isClosed = false;
      this.changeDetector.detectChanges();
    }
  }

  onMouseLeave() {
    if (this.sidebarService.isOpenedByHover) {
      this.sidebarService.isOpenedByHover = false;
      this.sidebarService.isClosed = true;
      this.changeDetector.detectChanges();
    }
  }

  @HostBinding('class.w-5')
  get closedClass() {
    return this.sidebarService.isClosed;
  }

  constructor(public readonly sidebarService: SidebarService, private readonly changeDetector:  ChangeDetectorRef) {}
}
