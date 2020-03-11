import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ContactsFormFields} from '@app/profile/enums/contacts-form-fields';
import {ContactFormService} from '@app/profile/forms/contact-form.service';
import {Contact} from '@app/profile/models/contact';
import {ContactApiService} from '@app/profile/services/contact-api.service';
import {plainToClass} from 'class-transformer';

@Component({
    selector: 'app-contact-tab',
    templateUrl: './contact-tab.component.html',
    styleUrls: ['./contact-tab.component.scss'],
})
export class ContactTabComponent implements OnInit {

    public form: FormGroup;
    public formFields = ContactsFormFields;

    constructor(public formService: ContactFormService, private api: ContactApiService) {
    }

    public ngOnInit(): void {
        this.formService.createForm().subscribe(
            form => this.form = form
        );
    }

    public submitContacts(): void {
        this.api.saveCurrentUserContact(plainToClass(Contact, this.form.getRawValue())).subscribe(
            contact => console.log(contact)
        );
    }
}
