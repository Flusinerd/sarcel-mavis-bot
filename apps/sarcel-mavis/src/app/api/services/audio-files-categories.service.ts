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

import { AudioFileCategoryDto } from '../models/audio-file-category-dto';
import { AudioFileCategoryUpdateDto } from '../models/audio-file-category-update-dto';
import { CreateAudioFileCategoryDto } from '../models/create-audio-file-category-dto';

@Injectable({
  providedIn: 'root',
})
export class AudioFilesCategoriesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllAudioFileCategories
   */
  static readonly GetAllAudioFileCategoriesPath = '/api/audio-files/categories';

  /**
   * Get all audio file categories.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAudioFileCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAudioFileCategories$Response(params?: {
  }): Observable<StrictHttpResponse<Array<AudioFileCategoryDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AudioFilesCategoriesService.GetAllAudioFileCategoriesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AudioFileCategoryDto>>;
      })
    );
  }

  /**
   * Get all audio file categories.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllAudioFileCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAudioFileCategories(params?: {
  }): Observable<Array<AudioFileCategoryDto>> {

    return this.getAllAudioFileCategories$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AudioFileCategoryDto>>) => r.body as Array<AudioFileCategoryDto>)
    );
  }

  /**
   * Path part for operation createAudioFileCategory
   */
  static readonly CreateAudioFileCategoryPath = '/api/audio-files/categories';

  /**
   * Create a new audio file category.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAudioFileCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAudioFileCategory$Response(params: {
    body: CreateAudioFileCategoryDto
  }): Observable<StrictHttpResponse<AudioFileCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, AudioFilesCategoriesService.CreateAudioFileCategoryPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AudioFileCategoryDto>;
      })
    );
  }

  /**
   * Create a new audio file category.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAudioFileCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAudioFileCategory(params: {
    body: CreateAudioFileCategoryDto
  }): Observable<AudioFileCategoryDto> {

    return this.createAudioFileCategory$Response(params).pipe(
      map((r: StrictHttpResponse<AudioFileCategoryDto>) => r.body as AudioFileCategoryDto)
    );
  }

  /**
   * Path part for operation updateAudioFileCategory
   */
  static readonly UpdateAudioFileCategoryPath = '/api/audio-files/categories/{id}';

  /**
   * Update an audio file category.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAudioFileCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAudioFileCategory$Response(params: {
    id: string;
    body: AudioFileCategoryUpdateDto
  }): Observable<StrictHttpResponse<AudioFileCategoryDto>> {

    const rb = new RequestBuilder(this.rootUrl, AudioFilesCategoriesService.UpdateAudioFileCategoryPath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AudioFileCategoryDto>;
      })
    );
  }

  /**
   * Update an audio file category.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAudioFileCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAudioFileCategory(params: {
    id: string;
    body: AudioFileCategoryUpdateDto
  }): Observable<AudioFileCategoryDto> {

    return this.updateAudioFileCategory$Response(params).pipe(
      map((r: StrictHttpResponse<AudioFileCategoryDto>) => r.body as AudioFileCategoryDto)
    );
  }

}
