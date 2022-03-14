import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import * as Minio from 'minio';
import * as path from 'path';

@Injectable()
export class FilesService {

  private readonly _bucketName: string;
  private readonly _accessKeyId: string;
  private readonly _secretAccessKey: string;
  private readonly _region: string;
  private readonly _endpoint: string;
  private readonly _s3: Minio.Client;

  private readonly _logger = new Logger(FilesService.name);

  constructor(
    private readonly _configService: ConfigService
  ) {
    this._bucketName = this._configService.get<string>('AWS_BUCKET_NAME');
    this._accessKeyId = this._configService.get<string>('AWS_ACCESS_KEY_ID');
    this._secretAccessKey = this._configService.get<string>('AWS_SECRET_ACCESS_KEY');
    this._region = this._configService.get<string>('AWS_REGION');
    this._endpoint = this._configService.get<string>('AWS_ENDPOINT');
    if (!this._bucketName) {
      throw new Error('AWS_BUCKET_NAME is not defined');
    }
    if (!this._accessKeyId) {
      throw new Error('AWS_ACCESS_KEY_ID is not defined');
    }
    if (!this._secretAccessKey) {
      throw new Error('AWS_SECRET_ACCESS_KEY is not defined');
    }
    if (!this._region) {
      throw new Error('AWS_REGION is not defined');
    }
    if (!this._endpoint) {
      throw new Error('AWS_ENDPOINT is not defined');
    }
    this._s3 = new Minio.Client({
      endPoint: this._endpoint,
      useSSL: true,
      accessKey: this._accessKeyId,
      secretKey: this._secretAccessKey,
      region: this._region
    })
  }

  public async uploadFile(dataBuffer: Buffer, fileName: string): Promise<string>{
    const fileId = uuid();
    const fileNameParsed = path.parse(fileName);

    let contentType = 'application/octet-stream';
    if (fileNameParsed.ext) {
      if (fileNameParsed.ext === '.mp3' || fileNameParsed.ext === '.wav') {
        contentType = 'audio/mpeg';
      }
    }

    const objectName = `${fileId}-${fileName}`;
    const metaData = {
      'Content-Type': contentType,
      'X-Amz-Meta-FileId': fileId,
    }
    try {
      await this._s3.putObject(
        this._bucketName,
        objectName,
        dataBuffer,
        metaData
      );
      return objectName;
    } catch (error) {
      this._logger.error(error);
      throw new Error('Error uploading file: ' + error);
    }
  }

  public async deleteFile(objectName: string): Promise<void>{
    try {
      await this._s3.removeObject(
        this._bucketName,
        objectName
      );
    } catch (error) {
      this._logger.error(error);
      throw new Error('Error deleting file: ' + error);
    }
  }

  public async getFileUrl(objectName: string): Promise<string>{
    try {
      return await this._s3.presignedGetObject(
        this._bucketName,
        objectName
      );
    } catch (error) {
      this._logger.error(error);
      throw new Error('Error getting file url: ' + error);
    }
  }

  public async getFile(objectName: string) {
    try {
      return await this._s3.getObject(
        this._bucketName,
        objectName
      );
    } catch (error) {
      this._logger.error(error);
      throw new Error('Error getting file: ' + error);
    }
  }
}
