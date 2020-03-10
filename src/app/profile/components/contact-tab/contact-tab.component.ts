import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ContactFormService} from '@app/profile/forms/contact-form.service';
import {ContactApiService} from '@app/profile/services/contact-api.service';

@Component({
    selector: 'app-contact-tab',
    templateUrl: './contact-tab.component.html',
    styleUrls: ['./contact-tab.component.scss'],
})
export class ContactTabComponent implements OnInit {

    public form: FormGroup;

    constructor(public formService: ContactFormService, private api: ContactApiService) {
    }

    public ngOnInit(): void {
        this.formService.createForm().subscribe(
            form => this.form = form
        );
    }

    public submitContacts(): void {
        console.log(this.form.getRawValue());
    }
}
