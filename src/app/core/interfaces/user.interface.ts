import {PartialUserInterface} from '@app/core/interfaces/partial-user-interface';

export interface UserInterface extends PartialUserInterface {
    patronymic?: string;
    password?: string;
    phone: string;
    gender: boolean;
    birthday?: string;
    main_language: string;
    languages?: string[];
    account_type: string;
}
