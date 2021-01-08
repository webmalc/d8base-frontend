import {ProfessionalList, UserExtended} from '@app/api/models';

export default interface MasterProfileContext {
    user?: UserExtended;
    master?: ProfessionalList;
    canEdit?: boolean;
}
