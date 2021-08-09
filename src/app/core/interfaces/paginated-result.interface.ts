export interface PaginatedResult<T> {
  count: number;
  next?: null | string;
  previous?: null | string;
  results: Array<T>;
}
