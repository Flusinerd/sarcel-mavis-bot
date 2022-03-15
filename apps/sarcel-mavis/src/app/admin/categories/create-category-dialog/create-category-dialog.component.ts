import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { nameExistsValidator } from '../name-exists.validator';
import { AudioFileCategoryDto } from '../../../api/models/audio-file-category-dto';
import { Observable, of } from 'rxjs';
import { AudioFilesCategoriesService } from '../../../api/services/audio-files-categories.service';

@Component({
  selector: 'sarcel-mavis-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CreateCategoryDialogComponent implements OnInit {

  private _existingCategories: Observable<AudioFileCategoryDto[]> = of([]);

  createCategoryForm = this._fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)], nameExistsValidator(this._existingCategories, of(undefined))],
    description: ['', [Validators.required, Validators.maxLength(255)]]
  })

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _categoriesService: AudioFilesCategoriesService
  ) {}

  ngOnInit(): void {
    this._existingCategories = this._categoriesService.getAllAudioFileCategories();
  }

}
