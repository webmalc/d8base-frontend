export interface UserInterface {
    id?: number;
    first_name: string;
    last_name: string;
    patronymic?: string;
    password?: string;
    email: string;
    phone: string;
    avatar?: string;
    gender: string;
    birthday?: string;
    main_language: string;
    languages?: string[];
    type_of_user: string;
}
