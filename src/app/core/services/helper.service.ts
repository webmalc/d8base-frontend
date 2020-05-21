import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    public static clean<T>(obj: T): T {
        for (const propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }

        return obj;
    }

    public static cleanArray<T>(arr: T[]): T[] {
        arr.forEach(val => this.clean(val));

        return arr;
    }
}
