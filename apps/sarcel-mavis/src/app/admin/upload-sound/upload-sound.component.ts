import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { AudioFileCategoryDto } from '../../api/models/audio-file-category-dto';
import { AudioFilesCategoriesService } from '../../api/services/audio-files-categories.service';
import { AudioFilesService } from '../../api/services/audio-files.service';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'sarcel-mavis-upload-sound',
  templateUrl: './upload-sound.component.html',
  styleUrls: ['./upload-sound.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UploadSoundComponent  {

  @ViewChild('stepper') stepper!: MatStepper;

  fileSet = false;
  fileName = '';
  fileExtension = '';
  file?: File;
  uploadProgress = 0;
  uploadComplete = false;
  uploading = false;
  fileForm = this._fb.group({
    fileName: ['', Validators.required],
    command: ['', [Validators.required, Validators.maxLength(50)]]
  });
  categoryForm = this._fb.group({
    categories: ['', Validators.required]
  });

  $categories: Observable<AudioFileCategoryDto[]>;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _categoryService: AudioFilesCategoriesService,
    private readonly _audioFilesService: AudioFilesService,
    private readonly _http: HttpClient
  ) {
    this.$categories = this._categoryService.getAllAudioFileCategories();
  }

  onFileChange(event: any) {
    const file = event.target?.files[0] as File;
    this.file = file;
    const parsedFilename = file.name.split('.');
    // Filename is all but the last part of the filename
    const filename = parsedFilename.slice(0, parsedFilename.length - 1).join('.');
    this.fileName = filename;
    // Extension is the last part of the filename
    this.fileExtension = parsedFilename[parsedFilename.length - 1];
    this.fileForm.patchValue({
      fileName: filename,
    });
    this.stepper.next();
  }

  createFile() {
    if (!this.file) {
      return;
    }
    this.uploading = true;
    const categories = this.categoryForm.get('categories')?.value as AudioFileCategoryDto[];


    const data = new FormData();
    data.append('file', this.file);
    data.append('name', this.fileName);
    data.append('command', this.fileForm.get('command')?.value);
    data.append('categoryIds', categories.map(c => c.id).join(','));

    const upload$: Observable<HttpEvent<unknown>> = this._http.post(AudioFilesService.CreateAudioFilePath, data, {
      reportProgress: true,
      observe: 'events'
    });

    upload$.subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const percentDone = Math.round(100 * event.loaded / event.total!);
          this.uploadProgress = percentDone;
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event.type === HttpEventType.Response) {
          this.uploadComplete = true;
          console.log('File is completely uploaded!');
          this.uploading = false;
        }
      },
      error => {
        console.error(error);
      }
    );


    // this._audioFilesService.createAudioFile({
    //   body: {
    //     file: this.file,
    //     command: this.fileForm.value.command,
    //     name: this.fileForm.value.fileName,
    //     categoryIds: categories.map(c => c.id)
    //   }
    // })
  }
}
