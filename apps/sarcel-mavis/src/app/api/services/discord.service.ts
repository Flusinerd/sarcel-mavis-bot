/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AccessTokenResponseDto } from '../models/access-token-response-dto';
import { TokenExchangeRequestDto } from '../models/token-exchange-request-dto';

@Injectable({
  providedIn: 'root',
})
export class DiscordService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation exchangeToken
   */
  static readonly ExchangeTokenPath = '/api/discord/auth/token';

  /**
   * Exchange a Discord OAuth2 code for an access token.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `exchangeToken()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  exchangeToken$Response(params: {
    body: TokenExchangeRequestDto
  }): Observable<StrictHttpResponse<AccessTokenResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, DiscordService.ExchangeTokenPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AccessTokenResponseDto>;
      })
    );
  }

  /**
   * Exchange a Discord OAuth2 code for an access token.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `exchangeToken$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  exchangeToken(params: {
    body: TokenExchangeRequestDto
  }): Observable<AccessTokenResponseDto> {

    return this.exchangeToken$Response(params).pipe(
      map((r: StrictHttpResponse<AccessTokenResponseDto>) => r.body as AccessTokenResponseDto)
    );
  }

}
