import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDashboardComponent } from './all-dashboard/all-dashboard.component';

const routes: Routes = [
  {
    path: 'all',
    component: AllDashboardComponent,
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
