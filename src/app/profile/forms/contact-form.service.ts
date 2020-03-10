import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Contact} from '@app/profile/models/contact';
import {ContactApiService} from '@app/profile/services/contact-api.service';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class ContactFormService {

    constructor(private formBuilder: FormBuilder, private apiContacts: ContactApiService) {
    }

    public createForm(): Observable<FormGroup> {
        return this.apiContacts.getCurrentUserContact().pipe(
            switchMap(
                (contacts: Contact) => {
                    return of(this.formBuilder.group({
                        whatsapp: [
                            contacts.whatsapp, []
                        ],
                        facebook_messenger: [
                            contacts.facebook_messenger, []
                        ],
                        instagram: [
                            contacts.instagram, []
                        ],
                        www: [
                            contacts.www, []
                        ]
                    }));
                }
            )
        );
    }
}
