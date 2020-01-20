export interface UserInterface {
    username: string;
    password: string | null;
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
}
