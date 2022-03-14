/* tslint:disable */
/* eslint-disable */
import { AudioFileCategoryDto } from './audio-file-category-dto';
export interface AudioFileDto {

  /**
   * Audio file categories
   */
  audioFileCategories?: Array<AudioFileCategoryDto>;

  /**
   * Audio file command
   */
  command?: string;
  id: string;

  /**
   * AWS S3 key of file
   */
  key: string;

  /**
   * File name with extension
   */
  name: string;
}
