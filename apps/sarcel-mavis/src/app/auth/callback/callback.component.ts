import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { lastValueFrom, timer } from 'rxjs';
import { LoadingService } from '../../loading/loading.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sarcel-mavis-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit{
  private state?: string | null;
  private code?: string | null;

  public redirectCountdown = 3000;
  public wasSuccessful = false;

  constructor(private readonly route: ActivatedRoute,
              private readonly authService: AuthService,
              private readonly loadingService: LoadingService,
              private readonly router: Router,
              private readonly toastr: ToastrService,
              private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit() {
    const params = this.route.snapshot.queryParamMap;
    this.state = params.get('state');
    this.code = params.get('code');

    if (!this.state || !this.code) {
      throw new Error('Invalid state or code');
    }


    this.loadingService.loadingText = 'Authenticating...';
    this.loadingService.isLoading = true;
    try {
      await lastValueFrom(this.authService.exchangeCodeForToken(this.code, this.state))
      console.log('Successfully authenticated');
      timer(0, 300).subscribe(() => {
        this.redirectCountdown -= 300;
        if (this.redirectCountdown <= 0) {
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(['/']);
        }
      });
      this.wasSuccessful = true;
      this.changeDetectorRef.detectChanges();
    } catch (error) {
      this.toastr.error('Failed to authenticate. Please try again', 'Error');
      console.error(error);
      console.error('Failed to authenticate');
    }
    this.loadingService.isLoading = false;
  }
}
