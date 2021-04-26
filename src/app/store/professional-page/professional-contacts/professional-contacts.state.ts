import { Injectable } from '@angular/core';
import { ProfessionalContact } from '@app/api/models';
import { AccountsService } from '@app/api/services';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import * as ProfessionalContactActions from './professional-contacts.actions';

export const emptyProfessionalContactState: ProfessionalContact[] = null;

export type ProfessionalContactStateModel = ProfessionalContact[];

@Injectable()
@State<ProfessionalContactStateModel>({
  name: 'ProfessionalContact',
  defaults: emptyProfessionalContactState,
})
export class ProfessionalContactState {
  constructor(private readonly accountsService: AccountsService) {}

  @Action(ProfessionalContactActions.LoadAllProfessionalContacts)
  public loadAllProfessionalContacts({ setState }: StateContext<ProfessionalContactStateModel>) {
    return this.accountsService.accountsProfessionalContactsList({}).pipe(
      tap(({ results }) => {
        setState(results);
      }),
    );
  }

  @Action(ProfessionalContactActions.CreateProfessionalContact)
  public createProfessionalContact(
    { setState, getState }: StateContext<ProfessionalContactStateModel>,
    { contact }: ProfessionalContactActions.CreateProfessionalContact,
  ) {
    return this.accountsService.accountsProfessionalContactsCreate(contact).pipe(
      tap(newProfessionalContact => {
        const contacts = getState();
        setState(contacts.concat(newProfessionalContact));
      }),
    );
  }

  @Action(ProfessionalContactActions.UpdateProfessionalContact)
  public updateProfessionalContact(
    { setState, getState }: StateContext<ProfessionalContactStateModel>,
    { contact }: ProfessionalContactActions.UpdateProfessionalContact,
  ) {
    return this.accountsService.accountsProfessionalContactsUpdate({ id: contact.id, data: contact }).pipe(
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

  @Action(ProfessionalContactActions.DeleteProfessionalContact)
  public deleteProfessionalContact(
    { setState, getState }: StateContext<ProfessionalContactStateModel>,
    { contactId: contactIdToDelete }: ProfessionalContactActions.DeleteProfessionalContact,
  ) {
    const contacts = getState();
    const idToDelete = contacts.find(({ id }) => id === contactIdToDelete)?.id;
    return this.accountsService.accountsProfessionalContactsDelete(idToDelete).pipe(
      tap(() => {
        setState(contacts.filter(({ id }) => id !== idToDelete));
      }),
    );
  }
}
