import {Country} from '@app/profile/models/country';
import {UserLanguage} from '@app/profile/models/user-language';

export interface PartialUserInterface {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    avatar_thumbnail: string;
    gender: boolean;
    is_confirmed: boolean;
    nationality: number | Country;
    birthday: string;
    languages?: UserLanguage[];
}
