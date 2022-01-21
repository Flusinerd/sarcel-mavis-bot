import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'sarcel-mavis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  redirectToDiscord() {
    window.location.href = this.authService.generateAuthUrl();
  }
}
