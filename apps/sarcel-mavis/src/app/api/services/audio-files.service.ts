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
import { AudioFileDto } from '../models/audio-file-dto';
import { CreateAudioFileCategoryDto } from '../models/create-audio-file-category-dto';
import { CreateAudioFileDto } from '../models/create-audio-file-dto';

@Injectable({
  providedIn: 'root',
})
export class AudioFilesService extends BaseService {
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

    const rb = new RequestBuilder(this.rootUrl, AudioFilesService.GetAllAudioFileCategoriesPath, 'get');
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

    const rb = new RequestBuilder(this.rootUrl, AudioFilesService.CreateAudioFileCategoryPath, 'post');
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

    const rb = new RequestBuilder(this.rootUrl, AudioFilesService.UpdateAudioFileCategoryPath, 'patch');
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

  /**
   * Path part for operation getAllAudioFiles
   */
  static readonly GetAllAudioFilesPath = '/api/audio-files';

  /**
   * Get all audio files
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAudioFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAudioFiles$Response(params?: {
    withCategories?: boolean;
    categoryId?: string;
  }): Observable<StrictHttpResponse<Array<AudioFileDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AudioFilesService.GetAllAudioFilesPath, 'get');
    if (params) {
      rb.query('withCategories', params.withCategories, {});
      rb.query('categoryId', params.categoryId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AudioFileDto>>;
      })
    );
  }

  /**
   * Get all audio files
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllAudioFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAudioFiles(params?: {
    withCategories?: boolean;
    categoryId?: string;
  }): Observable<Array<AudioFileDto>> {

    return this.getAllAudioFiles$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AudioFileDto>>) => r.body as Array<AudioFileDto>)
    );
  }

  /**
   * Path part for operation createAudioFile
   */
  static readonly CreateAudioFilePath = '/api/audio-files';

  /**
   * Create a new audio file
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAudioFile()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createAudioFile$Response(params: {

    /**
     * Create a new audio file
     */
    body: CreateAudioFileDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AudioFilesService.CreateAudioFilePath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
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
   * Create a new audio file
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAudioFile$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  createAudioFile(params: {

    /**
     * Create a new audio file
     */
    body: CreateAudioFileDto
  }): Observable<void> {

    return this.createAudioFile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAudioFileById
   */
  static readonly GetAudioFileByIdPath = '/api/audio-files/{id}';

  /**
   * Get an audio file by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAudioFileById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAudioFileById$Response(params: {
    id: string;
    withCategories?: boolean;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AudioFilesService.GetAudioFileByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('withCategories', params.withCategories, {});
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
   * Get an audio file by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAudioFileById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAudioFileById(params: {
    id: string;
    withCategories?: boolean;
  }): Observable<void> {

    return this.getAudioFileById$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation deleteAudioFile
   */
  static readonly DeleteAudioFilePath = '/api/audio-files/{id}';

  /**
   * Delete an audio file
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAudioFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAudioFile$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AudioFilesService.DeleteAudioFilePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
   * Delete an audio file
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteAudioFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAudioFile(params: {
    id: string;
  }): Observable<void> {

    return this.deleteAudioFile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAudioFileUrlById
   */
  static readonly GetAudioFileUrlByIdPath = '/api/audio-files/{id}/url';

  /**
   * Get an audio file url by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAudioFileUrlById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAudioFileUrlById$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AudioFilesService.GetAudioFileUrlByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * Get an audio file url by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAudioFileUrlById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAudioFileUrlById(params: {
    id: string;
  }): Observable<void> {

    return this.getAudioFileUrlById$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
