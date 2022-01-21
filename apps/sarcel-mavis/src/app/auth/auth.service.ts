import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AccessTokenResponseDto } from '../api/models/access-token-response-dto';
import { Observable } from 'rxjs';
import { DiscordService } from '../api/services/discord.service';

const SARCEL_MAVIS_STATE_KEY = 'sarcel_mavis_state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseURI: string;
  private readonly redirectURI: string;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private discordService: DiscordService
  ) {
    this.baseURI = document.baseURI;
    this.redirectURI = `${this.baseURI}auth/cb`;
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

  public generateAuthUrl(): string {
    const state = AuthService.generateState();
    AuthService.persistState(state);

    return `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${environment.discordClientId}&scope=identify&state=${state}&redirect_uri=${this.redirectURI}&prompt=none`;
  }

  public exchangeCodeForToken(code: string, receivedState: string): Observable<AccessTokenResponseDto> {
    if (!AuthService.validateState(receivedState)) {
      throw new Error('Invalid state');
    }

    return this.discordService.exchangeToken({
      body: {
        code,
        redirect_uri: this.redirectURI,
      }
    });
  }
}
