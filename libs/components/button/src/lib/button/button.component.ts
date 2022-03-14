import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sarcel-mavis-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ButtonComponent  {

  @Input() loading = false;

  @Input() disabled = false;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() click = new EventEmitter();

  onClick($event: MouseEvent) {
    if (!this.disabled && !this.loading) {
      this.click.emit($event);
    }
  }
}
