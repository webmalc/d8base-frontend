import { Observable, of } from 'rxjs';
import { User } from '@app/core/models/user';

const testUser: User = {
  id: 0,
  first_name: 'Test',
  last_name: 'User',
  email: '',
  phone: '',
  avatar: '',
  avatar_thumbnail: '',
  gender: 0,
  birthday: '',
  nationality: 0,
  main_language: '',
  account_type: '',
  is_confirmed: true,
};

export class UserManagerMock {
  public getCurrentUser(): Observable<User> {
    return of(testUser);
  }
}
