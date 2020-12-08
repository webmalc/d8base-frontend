import {Component} from '@angular/core';
import {Master} from '@app/core/models/master';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {PopoverController} from '@ionic/angular';
import {Observable} from 'rxjs';

export interface MasterPickerPopoverData {
    master: Master;
}

@Component({
    selector: 'app-master-picker-popover',
    templateUrl: './master-picker-popover.component.html',
    styleUrls: ['./master-picker-popover.component.scss']
})
export class MasterPickerPopoverComponent {

    public masterList$: Observable<Master[]>;

    constructor(private readonly popoverController: PopoverController,
                masterManager: MasterManagerService) {
        this.masterList$ = masterManager.getMasterList();
    }

    public onMasterClick(master: Master): void {
        this.popoverController.dismiss({ master }).then();
    }
}
