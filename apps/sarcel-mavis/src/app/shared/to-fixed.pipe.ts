import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed'
})
export class ToFixedPipe implements PipeTransform {

  transform(value: number, digits: number = 0, dir: 'up' | 'down' = 'down'): number {
    const round = dir === 'down' ? Math.floor : Math.ceil;
    return round(value * Math.pow(10, digits)) / Math.pow(10, digits);
  }

}
