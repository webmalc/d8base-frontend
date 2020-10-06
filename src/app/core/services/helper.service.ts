import {Injectable} from '@angular/core';
import {Contact} from '@app/profile/models/contact';
import {UserContact} from '@app/profile/models/user-contact';

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

    public static declination(num: number, words: string[]): string {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }

    public static calculateContacts(contacts: Contact[], userContacts: UserContact[]): Contact[] {
        const ret = [];
        del: for (const c of contacts) {
            for (const uc of userContacts) {
                if (c.id === uc.contact) {
                    continue del;
                }
            }
            ret.push(c);
        }

        return ret;
    }

    public static calculateAge(birthday: string): number {
        const ageDifMs = Date.now() - (new Date(birthday)).getTime();
        const ageDate = new Date(ageDifMs);

        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}
