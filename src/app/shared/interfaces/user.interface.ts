import SettingsInterface from '@app/shared/interfaces/settings.interface';

export interface UserInterface {
    id?: number;
    firstName: string;
    lastName: string;
    patronymic?: string;
    password?: string;
    email: string;
    phone: string;
    avatar?: string;
    gender: string;
    age?: number;
    main_language: string;
    languages?: string[];
    type_of_user: string;
}
