export class DiscordTokenExchangeRequestDto {
  client_id: string;
  client_secret: string;
  grant_type = 'authorization_code';
  code: string;
  redirect_uri: string;

  constructor(
    code: string,
    redirect_uri: string,
    client_id: string,
    client_secret: string
  ) {
    this.code = code;
    this.redirect_uri = redirect_uri;
    this.client_id = client_id;
    this.client_secret = client_secret;
  }
}
