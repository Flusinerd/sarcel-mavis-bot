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

import { DiscordUserDto } from '../models/discord-user-dto';

@Injectable({
  providedIn: 'root',
})
export class IdentityService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getIdentity
   */
  static readonly GetIdentityPath = '/api/discord/identity';

  /**
   * Gets the users identity data.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIdentity()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIdentity$Response(params?: {
  }): Observable<StrictHttpResponse<DiscordUserDto>> {

    const rb = new RequestBuilder(this.rootUrl, IdentityService.GetIdentityPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DiscordUserDto>;
      })
    );
  }

  /**
   * Gets the users identity data.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getIdentity$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIdentity(params?: {
  }): Observable<DiscordUserDto> {

    return this.getIdentity$Response(params).pipe(
      map((r: StrictHttpResponse<DiscordUserDto>) => r.body as DiscordUserDto)
    );
  }

}
