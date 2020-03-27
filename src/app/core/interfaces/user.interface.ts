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
    age?: number;
    main_language: string;
    languages?: string[];
    type_of_user: string;
}
