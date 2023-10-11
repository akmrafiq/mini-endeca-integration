import { Injectable } from '@angular/core';

export enum DateRangeOptionCode {
  CUSTOM_RANGE  = 0,
  LAST_MONTH    = 1,
  LAST_6_MONTH  = 6,
  LAST_YEAR     = 12,
  LAST_2_YEAR   = 24
}

export interface DateRangeSelected {
  propName: string;
  dates: Date[];
}

@Injectable({
  providedIn: 'root'
})
export class DateRangeFilterHelper {

  public formatDate(date: Date): string { // DD/MM/YYYY
    return date.getDate() + '/'
      + (date.getMonth() + 1) + '/'
      + date.getFullYear();
  }

  public formatDates(dates: Date[]): string[] {
    const fromDate = !!dates[0] ? this.formatDate(dates[0]) : '';
    const toDate = !!dates[1] ? this.formatDate(dates[1]) : '';
    return [fromDate, toDate];
  }

  public datesToPlaceholder(dates: Date[]): string {
    const [fromDate, toDate] = this.formatDates(dates);
    return fromDate + ((toDate.length > 0) ? ' - ' + toDate : '');
  }

  public getDatesFromLastMonths(lastMonths: number): Date[] {
    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - lastMonths);
    return [fromDate, new Date()];
  }
}
