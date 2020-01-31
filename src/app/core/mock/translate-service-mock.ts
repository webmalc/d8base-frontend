import {Pipe, PipeTransform} from '@angular/core';
import {of} from 'rxjs';

@Pipe({
    name: 'translate'
})
export class TranslateServiceMock implements PipeTransform {

    public get(key: any): any {
        return of(key);
    }

    transform(value: any, ...args: any[]): any {
        return value;
    }
}
