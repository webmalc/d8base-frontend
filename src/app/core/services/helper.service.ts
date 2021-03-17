import { ProfessionalContactInline } from '@app/api/models';
import { Contact } from '@app/profile/models/contact';

export class HelperService {

  public static getErrorListFromHttpErrorResponse(errorList: { [param: string]: string[] | string }): string[] {
    const result: string[] = [];
    for (const errorListElement in errorList) {
      if (errorList.hasOwnProperty(errorListElement)) {
        if (Array.isArray(errorList[errorListElement])) {
          result.push(...errorList[errorListElement]);
        }
        if ((typeof errorList[errorListElement] === 'string' || errorList[errorListElement] instanceof String)) {
          result.push((errorList[errorListElement] as string));
        }
      }
    }

    return result;
  }

  public static getDate(date: Date, offset: number): Date {
    const newDay = new Date(date);
    newDay.setDate(date.getDate() + offset);

    return newDay;
  }

  public static getTimeStringFromMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes - hours * 60;
    const hoursStr = /^\d$/.test(hours.toString()) ? `0${  hours.toString()}` : hours;
    const minsStr = /^\d$/.test(mins.toString()) ? `0${  mins.toString()}` : mins;

    return `${hoursStr}:${minsStr}`;
  }

  public static clear<T>(obj: T): T {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }

    return obj;
  }

  public static clearArray<T>(arr: T[]): T[] {
    arr?.forEach(val => this.clear(val));

    return arr;
  }

  public static getImgBase64(file: Blob | File): Promise<string> {
    return new Promise<string>(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
    });
  }

  public static getRatingTitle(rating: number): string {
    return `global.rating.${  Math.round(rating).toString(10)}`;
  }

  public static getNoAvatarLink(): string {
    return 'assets/images/profile/noavatar.jpeg';
  }

  public static declination(num: number, words: string[]): string {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
  }

  public static calculateContacts(contacts: Contact[], userContacts: ProfessionalContactInline[]): Contact[] {
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
