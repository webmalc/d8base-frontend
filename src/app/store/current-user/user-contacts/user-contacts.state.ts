import { Injectable } from '@angular/core';
import { UserContact } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import * as UserContactActions from './user-contacts.actions';

export const emptyUserContactState: UserContact[] = null;

export type UserContactStateModel = UserContact[];

@Injectable()
@State<UserContactStateModel>({
  name: 'UserContact',
  defaults: emptyUserContactState,
})
export class UserContactState {
  constructor(private readonly accountsService: AccountsService) {}

  @Action(UserContactActions.LoadAllUserContacts)
  public loadAllUserContacts({ setState }: StateContext<UserContactStateModel>) {
    return this.accountsService.accountsContactsList({}).pipe(
      tap(({ results }) => {
        setState(results);
      }),
    );
  }

  @Action(UserContactActions.CreateUserContact)
  public createUserContact(
    { setState, getState }: StateContext<UserContactStateModel>,
    { contact }: UserContactActions.CreateUserContact,
  ) {
    return this.accountsService.accountsContactsCreate(contact).pipe(
      tap(newUserContact => {
        const contacts = getState();
        setState(contacts.concat(newUserContact));
      }),
    );
  }

  @Action(UserContactActions.UpdateUserContact)
  public updateUserContact(
    { setState, getState }: StateContext<UserContactStateModel>,
    { contact }: UserContactActions.UpdateUserContact,
  ) {
    return this.accountsService.accountsContactsUpdate({ id: contact.id, data: contact }).pipe(
      tap(() => {
        const contacts = getState();
        const updatedContacts = contacts.map(existingContact => {
          if (existingContact.id === contact.id) {
            return contact;
          }
          return existingContact;
        });
        setState(updatedContacts);
      }),
    );
  }

  @Action(UserContactActions.DeleteUserContact)
  public deleteUserContact(
    { setState, getState }: StateContext<UserContactStateModel>,
    { contactId: contactIdToDelete }: UserContactActions.DeleteUserContact,
  ) {
    const contacts = getState();
    const idToDelete = contacts.find(({ id }) => id === contactIdToDelete)?.id;
    return this.accountsService.accountsContactsDelete(idToDelete).pipe(
      tap(() => {
        setState(contacts.filter(({ id }) => id !== idToDelete));
      }),
    );
  }
}
