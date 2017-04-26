import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'split'
})
export class SplitPipe implements PipeTransform {
  transform(value: string, delimitter: string): Array<string> {
    value = value || '';

    return value
      .split(delimitter)
      .map(i => i.trim())
      .filter(i => i.length);
  }
}
