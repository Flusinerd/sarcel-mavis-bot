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
  static readonly PlaySoundPath = '/api/discord/bot';

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

  /**
   * Path part for operation pauseSound
   */
  static readonly PauseSoundPath = '/api/discord/bot/pause';

  /**
   * Pauses the currently playing sound
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pauseSound()` instead.
   *
   * This method doesn't expect any request body.
   */
  pauseSound$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BotService.PauseSoundPath, 'post');
    if (params) {
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
   * Pauses the currently playing sound
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pauseSound$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pauseSound(params?: {
  }): Observable<void> {

    return this.pauseSound$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation resumeSound
   */
  static readonly ResumeSoundPath = '/api/discord/bot/resume';

  /**
   * Resumes the currently playing sound
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resumeSound()` instead.
   *
   * This method doesn't expect any request body.
   */
  resumeSound$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BotService.ResumeSoundPath, 'post');
    if (params) {
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
   * Resumes the currently playing sound
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `resumeSound$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resumeSound(params?: {
  }): Observable<void> {

    return this.resumeSound$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation stopSound
   */
  static readonly StopSoundPath = '/api/discord/bot/stop';

  /**
   * Stops the currently playing sound
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `stopSound()` instead.
   *
   * This method doesn't expect any request body.
   */
  stopSound$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BotService.StopSoundPath, 'post');
    if (params) {
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
   * Stops the currently playing sound
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `stopSound$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  stopSound(params?: {
  }): Observable<void> {

    return this.stopSound$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation botControllerBotStatus
   */
  static readonly BotControllerBotStatusPath = '/api/discord/bot/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `botControllerBotStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  botControllerBotStatus$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BotService.BotControllerBotStatusPath, 'get');
    if (params) {
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
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `botControllerBotStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  botControllerBotStatus(params?: {
  }): Observable<void> {

    return this.botControllerBotStatus$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
