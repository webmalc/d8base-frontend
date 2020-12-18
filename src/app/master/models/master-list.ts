import {ProfessionalList} from '@app/api/models/professional-list';
import {ProfessionalLocationInline} from '@app/api/models/professional-location-inline';
import {UserExtended} from '@app/api/models/user-extended';
import {Master} from '@app/core/models/master';
import {Expose} from 'class-transformer';

export class MasterList extends Master implements ProfessionalList {
    @Expose() public user: UserExtended;
    @Expose() public locations: Array<ProfessionalLocationInline>;
}
