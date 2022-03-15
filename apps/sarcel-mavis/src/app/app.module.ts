import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ApiModule } from './api/api.module';
import { LoadingModule } from './loading/loading.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthenticationInterceptorProvider } from './authentication.interceptor';
import { DiscordUserBadgeComponentModule } from './discord-user-badge/discord-user-badge.component';
import { SidebarModule } from '@sarcel-mavis/components/nav-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { BotStatusService } from './bot-status.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'dashboards',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  }
];

// Remove last character from string
const baseURI = document.baseURI.substring(0, document.baseURI.length - 1);
console.log('Base URI: ' + baseURI);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
    ApiModule.forRoot({ rootUrl: baseURI }),
    DiscordUserBadgeComponentModule,
    SidebarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    LoadingModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [
    AuthenticationInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
