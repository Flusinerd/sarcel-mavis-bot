import { Component, ViewEncapsulation } from '@angular/core';
import { SidebarStatusDirective } from '../sidebar-status.directive';

@Component({
  selector: 'sarcel-mavis-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SidebarHeaderComponent  extends SidebarStatusDirective{}
