import { UserContact } from '@app/api/models';
import { Selector } from '@ngxs/store';
import { UserContactState, UserContactStateModel } from './user-contacts.state';


export default class UserContactSelectors {
  @Selector([UserContactState])
  public static contacts(data: UserContactStateModel): UserContact[] {
    return data ?? [];
  }
}
