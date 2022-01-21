import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'sarcel-mavis-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent {
  private readonly state: string | null;
  private readonly code: string | null;

  constructor(route: ActivatedRoute, service: AuthService) {
    const params = route.snapshot.queryParamMap;
    this.state = params.get('state');
    this.code = params.get('code');

    if (!this.state || !this.code) {
      throw new Error('Invalid state or code');
    }

    lastValueFrom(service.exchangeCodeForToken(this.code, this.state)).then(r => {
      console.log(r);
      console.log('Successfully authenticated');
    }).catch(e => {
      console.error(e);
      console.error('Failed to authenticate');
    });
  }
}
