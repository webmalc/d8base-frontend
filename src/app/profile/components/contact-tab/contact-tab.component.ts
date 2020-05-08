import {Component, OnInit} from '@angular/core';
import {UserContact} from '@app/profile/models/user-contact';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';

@Component({
    selector: 'app-contact-tab',
    templateUrl: './contact-tab.component.html',
    styleUrls: ['./contact-tab.component.scss'],
})
export class ContactTabComponent implements OnInit {

    constructor(
        public userContactApiService: UserContactApiService
    ) {
    }

    public ngOnInit(): void {
    }

    public getNewUser(): ClientContactInterface {
        return new UserContact();
    }
}
