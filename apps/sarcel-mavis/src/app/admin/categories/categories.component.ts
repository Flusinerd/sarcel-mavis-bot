import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AudioFilesCategoriesService } from '../../api/services/audio-files-categories.service';
import { BehaviorSubject, combineLatest, Observable, take } from 'rxjs';
import { AudioFileCategoryDto } from '../../api/models/audio-file-category-dto';
import { LoadingService } from '../../loading/loading.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  Validators
} from '@angular/forms';
import { getDirtyValues } from '../../common/get-dirty-values';
import { map } from 'rxjs/operators';
import { nameExistsValidator } from './name-exists.validator';

@Component({
  selector: 'sarcel-mavis-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CategoriesComponent implements OnInit {

  private _categories$ = new BehaviorSubject<AudioFileCategoryDto[]>([]);

  get categories$() {
    return this._categories$.asObservable();
  }

  private _selectedCategory$ = new BehaviorSubject<AudioFileCategoryDto | undefined>(undefined);

  get selectedCategory$() {
    return this._selectedCategory$.asObservable();
  }

  set selectedCategory(category: AudioFileCategoryDto | undefined) {
    this._selectedCategory$.next(category);
  }

  get selectedCategory() {
    return this._selectedCategory$.getValue();
  }

  categoryForm = this._fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)], nameExistsValidator(this.categories$, this.selectedCategory$.pipe(map(category => category?.name)))],
    description: ['',  Validators.maxLength(255)],
  })


  constructor(
    private _categoriesService: AudioFilesCategoriesService,
    private _loadingService: LoadingService,
    private _toastr: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this._loadCategories();

    // Subscribe to changes of either the categories  or the route
    combineLatest([this._categories$, this._activatedRoute.params]).subscribe(([categories, params]) => {
      const id = params['id'];
      if (id) {
        this.selectedCategory = categories.find(c => c.id === id);
        if (this.selectedCategory) {
          this.categoryForm.patchValue(this.selectedCategory);
        }
      }
    });
  }


  private _loadCategories() {
    this._loadingService.isLoading = true;
    this._categoriesService.getAllAudioFileCategories().subscribe({
      next: (categories) => {
        this._categories$.next(categories);
      },
      error: (error) => {
        console.error(error);
        this._toastr.error('Error loading categories');
      },
      complete: () => {
        this._loadingService.isLoading = false;
      }
    });
  }

  public onSubmit() {
    if (!this.selectedCategory) {
      return;
    }
    const dirtyValues = getDirtyValues<AudioFileCategoryDto>(this.categoryForm);
    this._categoriesService.updateAudioFileCategory({
      id: this.selectedCategory.id,
      body: dirtyValues
    }).subscribe({
      next: (category) => {
        this._toastr.success('Category updated');
        this.selectedCategory = category;
        this.categoryForm.patchValue(category);
        this._loadCategories();
      },
      error: (error) => {
        console.error(error);
        this._toastr.error('Error updating category');
      }
    });
  }
}
