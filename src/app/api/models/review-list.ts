/* eslint-disable */
import { ReviewCommentInline } from './review-comment-inline';
import { ReducedUser } from './reduced-user';
export interface ReviewList {
  comment?: ReviewCommentInline;
  created?: string;
  description: string;
  id?: number;
  modified?: string;
  professional: number;
  rating: 1 | 2 | 3 | 4 | 5;
  title?: null | string;
  user?: ReducedUser;
}
