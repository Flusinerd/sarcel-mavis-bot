import { FormGroup } from '@angular/forms';

/**
 * Get the dirty values of a form group.
 * @param formGroup The form group.
 * @returns The dirty values.
 */
export function getDirtyValues<T>(formGroup: FormGroup): Partial<T>
export function getDirtyValues(formGroup: FormGroup): { [key: string]: unknown } {
  const dirtyValues: {[index: string]: unknown} = {};
  Object.keys(formGroup.controls).forEach(key => {
    const control = formGroup.controls[key];
    if (control.dirty) {
      dirtyValues[key] = control.value;
    }
  });
  return dirtyValues;
}




