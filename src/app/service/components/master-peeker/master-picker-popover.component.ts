import {Component} from '@angular/core';
import {ProfessionalList} from '@app/api/models/professional-list';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {PopoverController} from '@ionic/angular';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-master-picker-popover',
    templateUrl: './master-picker-popover.component.html',
    styleUrls: ['./master-picker-popover.component.scss']
})
export class MasterPickerPopoverComponent {

    public masterList$: Observable<ProfessionalList[]>;

    constructor(private readonly popoverController: PopoverController,
                masterManager: MasterManagerService) {
        this.masterList$ = masterManager.getMasterList();
    }

    public onMasterClick(master: ProfessionalList): void {
        this.popoverController.dismiss({ master }).then();
    }
}
