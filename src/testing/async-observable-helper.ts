import { defer, Observable } from 'rxjs';

export function asyncData<T>(data: T): Observable<T> {
  return defer(() => Promise.resolve<T>(data));
}

export function asyncError<T>(errorObject: any): Observable<any> {
  return defer(() => Promise.reject(errorObject));
}

