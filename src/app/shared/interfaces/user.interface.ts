import SettingsInterface from '@app/shared/interfaces/settings.interface';

export interface UserInterface {
    id?: number | null;
    username: string;
    password: string | null;
    avatar: string | null;
    access_token: string | null;
    refresh_token: string | null;
    email: string;
    phone: string | null;
    country: string | null;
    county_code: string | null;
    city: string | null;
    ip: string | null;
    postal_code: string| null;
    name: string | null;
    settings: SettingsInterface | null;
}
