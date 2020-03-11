import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ContactsFormFields} from '@app/profile/enums/contacts-form-fields';
import {Contact} from '@app/profile/models/contact';
import {ContactApiService} from '@app/profile/services/contact-api.service';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class ContactFormService {

    private form: FormGroup;

    constructor(private formBuilder: FormBuilder, private apiContacts: ContactApiService) {
    }

    public createForm(): Observable<FormGroup> {
        return this.apiContacts.getCurrentUserContact().pipe(
            switchMap(
                (contacts: Contact) => {
                    const form: FormGroup = this.formBuilder.group({
                        [ContactsFormFields.Whatsapp]: [
                            contacts.whatsapp, []
                        ],
                        [ContactsFormFields.FacebookMessenger]: [
                            contacts.facebook_messenger, []
                        ],
                        [ContactsFormFields.Instagram]: [
                            contacts.instagram, []
                        ],
                        [ContactsFormFields.WWW]: [
                            contacts.www, []
                        ]
                    });
                    this.form = form;

                    return of(form);
                }
            )
        );
    }

    public isDisabled(): boolean {
        return this.form.invalid || !this.form.dirty;
    }
}
