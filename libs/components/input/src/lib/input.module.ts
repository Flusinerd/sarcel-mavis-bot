import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [CommonModule, FormsModule, BrowserAnimationsModule],
  declarations: [
    InputComponent
  ],
  exports: [
    InputComponent
  ],
})
export class InputModule {}
