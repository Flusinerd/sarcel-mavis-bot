import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LoadingService } from './loading/loading.service';
import { ToastrService } from 'ngx-toastr';
import { DiscordService } from './api/services/discord.service';
import { DiscordUserDto } from './api/models/discord-user-dto';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MediaMatcher } from '@angular/cdk/layout';
import { BotStatusService, PLAYER_STATE } from './bot-status.service';
import { BotService } from './api/services/bot.service';

@Component({
  selector: 'sarcel-mavis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  private _userData?: DiscordUserDto

  public PLAYER_STATE = PLAYER_STATE;

  get userData(): DiscordUserDto | undefined {
    return this._userData
  }

  constructor(public authService: AuthService,
              public loadingService: LoadingService,
              private readonly toastr: ToastrService,
              private readonly discordService: DiscordService,
              private readonly router: Router,
              media: MediaMatcher,
              private readonly _changeDetectorRef: ChangeDetectorRef,
              public readonly botStatusService: BotStatusService,
              private readonly _botService: BotService
              ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => _changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  redirectToDiscord() {
    window.location.href = this.authService.generateAuthUrl();
  }

  async ngOnInit() {
    this.loadingService.$isLoading.subscribe(() => {
      this._changeDetectorRef.detectChanges();
    })
    this.botStatusService.$botStatus.subscribe(() => {
      this._changeDetectorRef.detectChanges();
    })
    await this.getUserData()
  }

  login() {
    window.location.href = this.authService.generateAuthUrl();
  }

  private async getUserData() {
    // Wait for isLoggedIn to be true
    await firstValueFrom(this.authService.$isLoggedIn.pipe(filter(isLoggedIn => isLoggedIn)))
    try {
    this.loadingService.isLoading = true;
      this._userData = await lastValueFrom(
        this.discordService.getIdentity()
      )
      console.log('User data', this._userData)
    } catch (error) {
      console.error(error);
      this.toastr.error('Failed to get user data');
    }
    this.loadingService.isLoading = false;
  }

  public logout() {
    this.authService.logout();
  }

  public async onResume() {
    await lastValueFrom(this._botService.resumeSound())
  }

  public async onPause() {
    await lastValueFrom(this._botService.pauseSound())
  }

  public async onStop() {
    await lastValueFrom(this._botService.stopSound())
  }
}
