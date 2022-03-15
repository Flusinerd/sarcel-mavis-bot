import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AccessTokenResponseDto } from '../api/models/access-token-response-dto';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { DiscordService } from '../api/services/discord.service';

const SARCEL_MAVIS_STATE_KEY = 'sarcel_mavis_state';
const SARCEL_MAVIS_TOKEN_KEY = 'sarcel_mavis_token';
const SARCEL_MAVIS_REFRESH_TOKEN_KEY = 'sarcel_mavis_refresh_token';
const SARCEL_MAVIS_EXPIRES_AT_KEY = 'sarcel_mavis_expires_at';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseURI: string;
  private readonly redirectURI: string;
  private _accessToken?: string;
  private _refreshToken?: string;
  private _expiresAt?: number;
  private _isLoggedIn = new BehaviorSubject(false);
  private _tryingToLogin = new BehaviorSubject(false);

  get $tryingToLogin() {
    return this._tryingToLogin.asObservable();
  }

  get $isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  get accessToken() {
    return this._accessToken;
  }

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private readonly discordService: DiscordService
  ) {
    this._isLoggedIn.subscribe((isLoggedIn) => {
      console.log('Is logged in', isLoggedIn);
    });
    this.baseURI = document.baseURI;
    this.redirectURI = `${this.baseURI}auth/cb`;
    this._loadFromLocalStorage();
  }



  private static validateState(state: string): boolean {
    const storedState = localStorage.getItem(SARCEL_MAVIS_STATE_KEY);
    return storedState === state;
  }

  private static generateState(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  private static persistState(state: string): void {
    localStorage.setItem(SARCEL_MAVIS_STATE_KEY, state);
  }

  /**
   * Returns the URL the user should be redirected to in order to authenticate with Discord.
   */
  public generateAuthUrl(): string {
    const state = AuthService.generateState();
    AuthService.persistState(state);
    return `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${environment.discordClientId}&scope=identify&state=${state}&redirect_uri=${this.redirectURI}&prompt=none`;
  }

  /**
   * Exchanges the authorization code for an access token.
   * @param code The authorization code.
   * @param receivedState The state received from the authorization request.
   */
  public exchangeCodeForToken(code: string, receivedState: string): Observable<AccessTokenResponseDto> {
    if (!AuthService.validateState(receivedState)) {
      throw new Error('Invalid state');
    }

    console.log(`Exchanging code for token: ${code}`);

    return this.discordService.exchangeToken({
      body: {
        code,
        redirect_uri: this.redirectURI,
      }
    }).pipe(tap((response) =>  {
      console.log(`Exchanged code for token: ${response.access_token}`);
      localStorage.removeItem(SARCEL_MAVIS_STATE_KEY)
      this._accessToken = response.access_token;
      this._refreshToken = response.refresh_token;
      this._expiresAt = Date.now() + response.expires_in * 1000;
      this._isLoggedIn.next(true);
      this._saveTokenToLocalStorage();
    }));
  }

  private _saveTokenToLocalStorage() {
    if (this._accessToken) {
      localStorage.setItem(SARCEL_MAVIS_TOKEN_KEY, this._accessToken);
    }
    if (this._refreshToken) {
      localStorage.setItem(SARCEL_MAVIS_REFRESH_TOKEN_KEY, this._refreshToken);
    }
    if (this._expiresAt) {
      localStorage.setItem(SARCEL_MAVIS_EXPIRES_AT_KEY, this._expiresAt.toString());
    }
  }

  // noinspection JSMethodCanBeStatic
  private _clearLocalStorage() {
    localStorage.removeItem(SARCEL_MAVIS_TOKEN_KEY);
    localStorage.removeItem(SARCEL_MAVIS_REFRESH_TOKEN_KEY);
    localStorage.removeItem(SARCEL_MAVIS_EXPIRES_AT_KEY);
  }

  /**
   * Refreshes the access token using the refresh token.
   * Logs the user out if the refresh token is invalid.
   */
  public refreshToken(): Observable<AccessTokenResponseDto> {
    if (!this._refreshToken) {
      console.error('No refresh token');
      return throwError(() => {
        new Error('No refresh token');
      });
    }
    return this.discordService.refreshToken({
      body: {
        refreshToken: this._refreshToken,
      }
    }).pipe(tap((response) => {
      this._accessToken = response.access_token;
      this._expiresAt = Date.now() + response.expires_in * 1000;
      this._refreshToken = response.refresh_token;
      this._saveTokenToLocalStorage();
      this._isLoggedIn.next(true);
    }), catchError((error) => {
      this._isLoggedIn.next(false);
      throw error;
    }));
  }

  private _loadFromLocalStorage() {
    const exipresAt = localStorage.getItem(SARCEL_MAVIS_EXPIRES_AT_KEY);
    const accessToken = localStorage.getItem(SARCEL_MAVIS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(SARCEL_MAVIS_REFRESH_TOKEN_KEY);

    // If there is no refresh token, the user is not logged in.
    if (!refreshToken) {
      this._isLoggedIn.next(false);
      return;
    }

    // If there is no acces token, or the token has expired, refresh the token.
    this._refreshToken = refreshToken;
    if (exipresAt && accessToken) {
      this._expiresAt = parseInt(exipresAt, 10);

      // Check if the token is not expired.
      if (this._expiresAt > Date.now()) {
        this._accessToken = accessToken;
        this._isLoggedIn.next(true);
      } else {
        this._isLoggedIn.next(false);
      }
    }
  }

  /**
   * Logs the user out.
   */
  public logout(): void {
    this._isLoggedIn.next(false);
    this._accessToken = undefined;
    this._refreshToken = undefined;
    this._expiresAt = undefined;
    this._clearLocalStorage();
  }
}
