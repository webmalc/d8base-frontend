import {Component, OnInit} from '@angular/core';
import {MasterManagerService} from '@app/core/services/master-manager.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss']
})
export class ProfilePage {
    constructor(public masterManager: MasterManagerService) {
    }
}
