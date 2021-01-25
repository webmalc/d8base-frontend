/* eslint-disable */
import { Search } from './search';
export interface PaginatedResult {
  count?: number;
  next?: string;
  previous?: string;
  results?: Array<Search>;
}
