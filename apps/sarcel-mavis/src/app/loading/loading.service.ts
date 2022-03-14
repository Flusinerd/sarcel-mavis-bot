import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading = new BehaviorSubject(false);
  private _loadingText = new BehaviorSubject('');

  get $isLoading() {
    return this._isLoading.asObservable();
  }

  get $loadingText() {
    return this._loadingText.asObservable();
  }

  set isLoading(value: boolean) {
    // Check if the value is different than the current value
    if (value !== this._isLoading.value) {
      this._isLoading.next(value);
      this.loadingText = '';
    }
  }

  get isLoading() {
    return this._isLoading.getValue();
  }


  set loadingText(value: string) {
    this._loadingText.next(value);
  }

  get loadingText() {
    return this._loadingText.getValue();
  }
}
