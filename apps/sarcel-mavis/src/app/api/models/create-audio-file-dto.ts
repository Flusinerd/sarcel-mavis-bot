/* tslint:disable */
/* eslint-disable */
export interface CreateAudioFileDto {

  /**
   * UUIDs of the categores to which the audio file belongs
   */
  categoryIds: Array<string>;

  /**
   * Audio file command
   */
  command?: string;
  file: Blob;
  name: string;
}
