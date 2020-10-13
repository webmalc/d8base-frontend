import {SafeResourceUrl} from '@angular/platform-browser';

export interface PartialUserInterface {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    avatar_thumbnail: string;
    gender: boolean;
    is_confirmed: boolean;

    getAvatar(): string | SafeResourceUrl;

    getAvatarThumbnail(): string | SafeResourceUrl;
}
