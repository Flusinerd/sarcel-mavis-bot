import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SidebarStatusDirective } from '../sidebar-status.directive';
import { filter, timer } from 'rxjs';
import { expandOnEnterAnimation, collapseOnLeaveAnimation, rotateAnimation } from 'angular-animations';
@Component({
  selector: 'sarcel-mavis-sidebar-accordion',
  templateUrl: './sidebar-accordion.component.html',
  styleUrls: ['./sidebar-accordion.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  animations: [
    expandOnEnterAnimation(),
    collapseOnLeaveAnimation(),
    rotateAnimation({
      degrees: 90,
    })
  ]
})
export class SidebarAccordionComponent extends SidebarStatusDirective implements OnInit {
  @Input() title?: string;
  @Input() icon?: string;

  public contentVisible = false;

  override applyClass = false;

  ngOnInit() {
    this.delayedClass.pipe(filter(val => val)).subscribe((val) => {
      this.contentVisible = !val;
    })

    this.sidebarService.$openAccordion.subscribe(val => {
      if (val !== this) {
        this.contentVisible = false;
      }
    })
  }

  toggleContent() {
    if(this.sidebarService.isClosed) {
      this.sidebarService.isClosed = false;
      timer(200).subscribe(() => {
        this.contentVisible = !this.contentVisible;
        if(this.contentVisible) {
          this.sidebarService.openAccordion = this;
        } else {
          this.sidebarService.openAccordion = null;
        }
      })
    } else {
      this.contentVisible = !this.contentVisible;
      if(this.contentVisible) {
        this.sidebarService.openAccordion = this;
      } else {
        this.sidebarService.openAccordion = null;
      }
    }
  }

}
