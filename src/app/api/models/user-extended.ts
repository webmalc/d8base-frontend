/* eslint-disable */
import { UserLanguage } from './user-language';
export interface UserExtended {
    avatar?: string;
    avatar_thumbnail?: string;
    birthday?: null | string;
    first_name?: string;
    gender?: null | 0 | 1;
    id?: number;

    /**
     * is account confirmed?
     */
    is_confirmed?: boolean;
    languages?: Array<UserLanguage> | number[];
    last_name?: string;
    nationality?: null | number;
}
