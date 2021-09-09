import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { mapTo, startWith } from 'rxjs/operators';

@Injectable()
export class IntervalService {
  public ticks(period: number): Observable<void> {
    return interval(period).pipe(startWith(0), mapTo(void 0));
  }
}
