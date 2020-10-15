import {Master} from '../../app/core/models/master';

export class MasterFixture {
    public static create(): Master {
        return {
            id: 0,
            name: '',
            company: '',
            level: '',
            description: '',
            experience: 0,
            subcategory: 0,
            rating: '4'
        };
    }
}
