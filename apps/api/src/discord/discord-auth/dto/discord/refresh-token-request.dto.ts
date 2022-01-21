export class RefreshTokenRequestDto {
  client_id: string;
  client_secret: string;
  grant_type = 'refresh_token';
  refresh_token: string;

  constructor(refreshToken: string, client_id: string, client_secret: string) {
    this.refresh_token = refreshToken;
    this.client_id = client_id;
    this.client_secret = client_secret;
  }
}
