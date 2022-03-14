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

import { PlaySoundDto } from '../models/play-sound-dto';

@Injectable({
  providedIn: 'root',
})
export class BotService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation playSound
   */
  static readonly PlaySoundPath = '/api/bot';

  /**
   * Plays the provided sound
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `playSound()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  playSound$Response(params: {
    body: PlaySoundDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BotService.PlaySoundPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Plays the provided sound
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `playSound$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  playSound(params: {
    body: PlaySoundDto
  }): Observable<void> {

    return this.playSound$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
