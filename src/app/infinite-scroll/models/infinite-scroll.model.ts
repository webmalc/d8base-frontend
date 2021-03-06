import { Observable } from 'rxjs';

export interface PaginatedResult<T> {
  count: number;
  next?: string;
  previous?: string;
  results: Array<T>;
}

export interface Params {
  [K: string]: unknown;
}

export type InfiniteScrollData<P, R> = {
  params: P;
  apiRequestFunction: (params: Params) => Observable<PaginatedResult<R>>;
};