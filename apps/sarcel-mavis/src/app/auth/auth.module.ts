import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  { path: '', component: AuthComponent }
];

@NgModule({
  declarations: [
    AuthComponent,
    CallbackComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
