/* tslint:disable */
/* eslint-disable */
import { AudioFileDto } from './audio-file-dto';
export interface AudioFileCategoryDto {
  audioFiles?: Array<AudioFileDto>;

  /**
   * Description of the audio file category
   */
  description: string;

  /**
   * The unique identifier of the audio file category.
   */
  id: string;

  /**
   * The name of the category
   */
  name: string;
}
