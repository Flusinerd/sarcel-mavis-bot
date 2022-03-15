import { combineLatest, Observable, take } from 'rxjs';
import { AudioFileCategoryDto } from '../../api/models/audio-file-category-dto';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';

export function nameExistsValidator(existing: Observable<AudioFileCategoryDto[]>, selected: Observable<string | undefined>): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
    return combineLatest([existing, selected]).pipe(
      map(([categories, selected]) => {
        const name = control.value;
        if (!name) {
          return null;
        }
        if (selected === name) {
          return null;
        }
        const exists = categories.find(c => c.name === name);
        return exists ? { nameExists: true } : null;
      }),
      take(1)
    );
  };
}


