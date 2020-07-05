import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { today, yesterday, dateOnly } from '../helpers/date.helper';

@Pipe({
  name: 'shortdate'
})
export class ShortDatePipe extends DatePipe implements PipeTransform {

  constructor() {
    super('en');
  }

  transform(value: any, format?: string, timezone?: string, locale?: string): string {
    const date = dateOnly(new Date(value));
    if (date === today()) {
      return 'Today';
    } else if (date === yesterday()) {
      return 'Yesterday';
    } else {
      return super.transform(value, format || 'EEEE, dd MMMM yyyy', timezone, locale);
    }
  }

}
