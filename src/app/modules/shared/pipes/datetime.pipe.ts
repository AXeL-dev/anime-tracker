import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'datetime',
})
export class DateTimePipe extends DatePipe implements PipeTransform {
  constructor() {
    super('en');
  }

  transform(value: Date | string | number): string | null;
  transform(value: null | undefined): null;
  transform(value: any, format?: string, timezone?: string, locale?: string): string {
    return super.transform(value, format || 'dd MMMM yyyy HH:mm', timezone, locale);
  }
}
