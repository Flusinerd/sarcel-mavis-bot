/* tslint:disable */
/* eslint-disable */
export interface AccessTokenResponseDto {

  /**
   * The access token
   */
  access_token: string;

  /**
   * The time in seconds until the access token expires
   */
  expires_in: number;

  /**
   * The refresh token
   */
  refresh_token: string;

  /**
   * A space delimited list of scopes. See https://discordapp.com/developers/docs/topics/oauth2#scopes
   */
  scope: string;

  /**
   * The token type
   */
  token_type: string;
}
