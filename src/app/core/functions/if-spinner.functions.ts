import { Observable, ObservableInput, of, pipe, UnaryFunction } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { ContentState, ErrorState, IfSpinnerState, LoadedState, LoadingState } from '../types/if-spinner.types';

export const ifSpinnerOperator = <T>(): UnaryFunction<Observable<T>, Observable<IfSpinnerState<T>>> =>
  pipe(
    map<T, LoadedState<T>>((data: T) => ({
      state: ContentState.LOADED,
      data,
    })),
    startWith<IfSpinnerState<T>, LoadingState>({ state: ContentState.LOADING }),
    catchError<IfSpinnerState<T>, ObservableInput<ErrorState>>(e =>
      of({
        state: ContentState.ERROR,
        error: e.message,
      }),
    ),
  );

export const isIfSpinnerState = <T>(value: any): value is IfSpinnerState<T> =>
  value && Object.values(ContentState).includes(value?.state);