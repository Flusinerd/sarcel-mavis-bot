import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SidebarAccordionComponent } from './sidebar-accordion/sidebar-accordion.component';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private $_isClosed = new BehaviorSubject(false);

  public isOpenedByHover = false;

  public get $isClosed(): Observable<boolean> {
    return this.$_isClosed.asObservable();
  }

  public set isClosed(value: boolean) {
    this.$_isClosed.next(value);
  }

  public get isClosed(): boolean {
    return this.$_isClosed.getValue();
  }

  private $_openAccordion = new BehaviorSubject<SidebarAccordionComponent | null>(null);

  public get $openAccordion(): Observable<SidebarAccordionComponent | null> {
    return this.$_openAccordion.asObservable();
  }

  public set openAccordion(value: SidebarAccordionComponent | null) {
    this.$_openAccordion.next(value);
  }

  public get openAccordion(): SidebarAccordionComponent | null {
    return this.$_openAccordion.getValue();
  }
}
