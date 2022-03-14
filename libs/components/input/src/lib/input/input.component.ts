import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  fadeInOnEnterAnimation,
  fadeInRightOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  fadeOutRightOnLeaveAnimation
} from 'angular-animations';

type inputType = string | number | boolean | null;

@Component({
  selector: 'sarcel-mavis-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ],
  animations: [
    fadeInRightOnEnterAnimation({duration: 200}),
    fadeOutRightOnLeaveAnimation({duration: 200})
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() type?: string;
  private _hasBeenTouched = false;

  public hasError = false;


  set hasBeenTouched(value: boolean) {
    this._hasBeenTouched = value;
  }

  private _hadFocus = false;

  set hadFocus(value: boolean) {
    this._hadFocus = value;
  }

  private _value: inputType = null;

  get value(): inputType {
    return this._value;
  }

  set value(val: inputType) {
    if (val !== this._value) {

      if (val === '') {
        this._value = null;
      } else {
        this._value = val;
      }
      this.onChange(val);
      this.onBlur();
    }
  }

  private _disabled = false;

  get disabled(): boolean {
    return this._disabled;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {
  };

  registerOnChange(fn: never): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: never): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  writeValue(obj: inputType): void {
    this.value = obj;
  }

  onBlur(): void {
    if (!this._hasBeenTouched && this._hadFocus) {
      console.log('onBlur');
      this.onTouched(this.value);
      this._hasBeenTouched = true;
    }
  }
}
