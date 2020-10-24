import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { today, yesterday, dateOnly } from 'src/app/helpers/date.helper';

@Pipe({
  name: 'shortdate'
})
export class ShortDatePipe extends DatePipe implements PipeTransform {

  constructor() {
    super('en');
  }

  transform(value: any, format?: string, timezone?: string, locale?: string): string {
    const date = dateOnly(new Date(value));
    switch (date) {
      case today():
        return 'Today';
      case yesterday():
        return 'Yesterday';
      default:
        return super.transform(value, format || 'EEEE, dd MMMM yyyy', timezone, locale);
    }
  }

}
