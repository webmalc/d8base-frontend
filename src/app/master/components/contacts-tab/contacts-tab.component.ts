import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiListResponseInterface} from '@app/core/interfaces/api-list-response.interface';
import {MasterContact} from '@app/master/models/master-contact';
import {MasterContactsApiService} from '@app/master/services/master-contacts-api.service';
import {UserContact} from '@app/profile/models/user-contact';
import {UserContactApiService} from '@app/profile/services/user-contact-api.service';
import {ClientContactInterface} from '@app/shared/interfaces/client-contact-interface';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-master-contacts-tab',
    templateUrl: './contacts-tab.component.html',
    styleUrls: ['./contacts-tab.component.scss'],
})
export class ContactsTabComponent implements OnInit {

    public masterId: number;
    public masterContactsData: MasterContact[] = [];

    constructor(
        public masterContactsApiService: MasterContactsApiService,
        private route: ActivatedRoute,
        private userContactsApiService: UserContactApiService,
        private alert: AlertController
    ) {
    }

    public ngOnInit(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.generateContactsData();
    }

    public getNewMasterContact(): () => ClientContactInterface {
        return () => {
            const contact = new MasterContact();
            contact.professional = this.masterId;

            return contact;
        };
    }

    private showFillContactsMessage(dataToFill: UserContact[]): void {
        this.alert.create({
            header: 'Confirm!',
            message: 'Fill professional contacts with user contacts data',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'OK',
                    handler: () => this.masterContactsData = dataToFill
                }
            ]
        }).then(alert => alert.present());
    }

    private generateContactsData(): void {
        this.masterContactsApiService.getByClientId(this.masterId).subscribe(
            (masterContacts: ApiListResponseInterface<MasterContact>) => {
                if (masterContacts.results.length === 0) {
                    this.userContactsApiService.getCurrentClientContacts().subscribe(
                        (data: ApiListResponseInterface<UserContact>) => this.showFillContactsMessage(data.results)
                    );
                }
            }
        );
    }
}
