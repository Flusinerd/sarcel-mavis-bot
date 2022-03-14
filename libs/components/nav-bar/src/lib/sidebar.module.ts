import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarHeaderComponent } from './sidebar/sidebar-header/sidebar-header.component';
import { SidebarAccordionComponent } from './sidebar/sidebar-accordion/sidebar-accordion.component';
import { SidebarLinkComponent } from './sidebar/sidebar-link/sidebar-link.component';
import { SidebarService } from './sidebar/sidebar.service';
import { SidebarStatusDirective } from './sidebar/sidebar-status.directive';



@NgModule({
  declarations: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarAccordionComponent,
    SidebarLinkComponent,
    SidebarStatusDirective
  ],
  providers: [SidebarService],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarAccordionComponent,
    SidebarLinkComponent
  ]
})
export class SidebarModule { }
