import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoadingService } from './loading/loading.service';
import { ToastrService } from 'ngx-toastr';
import { DiscordService } from './api/services/discord.service';
import { DiscordUserDto } from './api/models/discord-user-dto';
import { delay, lastValueFrom, retry, retryWhen} from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarService } from '../../../../libs/components/nav-bar/src/lib/sidebar/sidebar.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'sarcel-mavis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  mobileQuery: MediaQueryList;

  private readonly _mobileQueryListener: () => void;

  private _userData?: DiscordUserDto

  public adminPopupVisibility = false;
  private _isAdminRoute = false;
  get isAdminRoute(): boolean {
    return this._isAdminRoute;
  }


  get userData(): DiscordUserDto | undefined {
    return this._userData
  }

  constructor(public authService: AuthService,
              public loadingService: LoadingService,
              private readonly toastr: ToastrService,
              private readonly discordService: DiscordService,
              private readonly router: Router,
              public readonly sidebarService: SidebarService,
              media: MediaMatcher,
              private readonly _changeDetectorRef: ChangeDetectorRef
              ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => _changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  redirectToDiscord() {
    window.location.href = this.authService.generateAuthUrl();
  }

  @HostListener('window:click', ['$event'])
  onClick(event: MouseEvent) {
    // If the user clicks outside of the popup, close it
    // Don't close it if the user clicks on the popup itself or on the close button
    const target = event.target as HTMLElement;
    if (this.adminPopupVisibility && event && !target.closest('.admin-popup') && !target.closest('.admin-popup-handler')) {
      this.adminPopupVisibility = false;
    }
  }

  ngOnInit() {
    //this.getUserData()
    this.loadingService.$isLoading.subscribe(() => {
      this._changeDetectorRef.detectChanges();
    })
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((event) => {
      const typedEvent = event as NavigationEnd;
      this.adminPopupVisibility = false;
      if (typedEvent.url.includes('/admin')) {
        this._isAdminRoute = true;
        console.log('Is admin route')
      }
    })
  }

  private async getUserData() {
    this.loadingService.isLoading = true;
    try {
      this._userData = await lastValueFrom(
        this.discordService.getIdentity()
          .pipe(
            retryWhen(errors => errors.pipe(delay(1000), retry(3))),
          )
      )
    } catch (error) {
      console.error(error);
      this.toastr.error('Failed to get user data');
    }
    this.loadingService.isLoading = false;
  }

  public logout() {
    this.authService.logout();
  }


}
