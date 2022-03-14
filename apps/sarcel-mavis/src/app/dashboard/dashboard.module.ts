import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AllDashboardComponent } from './all-dashboard/all-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DashboardDirective } from './dashboard.directive';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    AllDashboardComponent,
    DashboardDirective
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class DashboardModule { }
