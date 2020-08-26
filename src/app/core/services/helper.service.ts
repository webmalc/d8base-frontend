import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    public static clear<T>(obj: T): T {
        for (const propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }

        return obj;
    }

    public static clearArray<T>(arr: T[]): T[] {
        arr.forEach(val => this.clear(val));

        return arr;
    }

    public static getImgBase64(file: Blob | File): Promise<string> {
        return new Promise<string>(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
        });
    }

    public static fromDatetime(datetime: string): { date: string; time: string; } {
        return {
            date: datetime.slice(0, 10),
            time: datetime.slice(11, 16)
        };
    }

    public static getNoAvatarLink(): string {
        return 'assets/images/profile/noavatar.jpeg';
    }
}
