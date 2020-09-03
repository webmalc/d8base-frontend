import {PartialUserInterface} from '@app/core/interfaces/partial-user-interface';
import {Country} from '@app/profile/models/country';

export interface UserInterface extends PartialUserInterface {
    patronymic?: string;
    password?: string;
    phone: string;
    gender: boolean;
    birthday?: string;
    main_language: string;
    languages?: string[];
    account_type: string;
    nationality: number | Country;
}
