import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';

export class ApiListResponseFixture {
    public static create<T>(results?: T[]): ApiListResponseInterface<T> {
        return {
            count: 0,
            next: null,
            previous: null,
            results
        };
    }
}
