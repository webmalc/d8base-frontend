import { Pipe, PipeTransform } from '@angular/core';
import { ifSpinnerOperator } from '@app/core/functions/if-spinner.functions';
import { IfSpinnerState } from '@app/core/types/if-spinner.types';
import { Observable } from 'rxjs';

@Pipe({
  name: 'ifSpinnerState',
})
export class IfSpinnerStatePipe<T> implements PipeTransform {
  public transform(value: Observable<T>): Observable<IfSpinnerState<T>> {
    return value.pipe(ifSpinnerOperator<T>());
  }
}
