export interface UserInterface {
    id?: number;
    first_name: string;
    last_name: string;
    patronymic?: string;
    password?: string;
    email: string;
    phone: string;
    avatar?: string;
    gender: boolean;
    birthday?: string;
    main_language: string;
    languages?: string[];
    account_type: string;
}
