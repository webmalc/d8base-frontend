import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MasterContact} from '@app/master/models/master-contact';
import {MasterContactsApiService} from '@app/master/services/master-contacts-api.service';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';

@Component({
    selector: 'app-master-contacts-tab',
    templateUrl: './contacts-tab.component.html',
    styleUrls: ['./contacts-tab.component.scss'],
})
export class ContactsTabComponent implements OnInit {

    public masterId: number;

    constructor(public masterContactsApiService: MasterContactsApiService, private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    }

    public getNewMasterContact(): () => ClientContactInterface {
        return () => {
            const contact = new MasterContact();
            contact.professional = this.masterId;

            return contact;
        };
    }
}
