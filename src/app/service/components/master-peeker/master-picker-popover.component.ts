import {Component} from '@angular/core';
import {Master} from '@app/core/models/master';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {Reinitable} from '@app/shared/abstract/reinitable';
import {BehaviorSubject} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-master-picker-popover',
    templateUrl: './master-picker-popover.component.html',
    styleUrls: ['./master-picker-popover.component.scss']
})
export class MasterPickerPopoverComponent extends Reinitable {

    public static master$: BehaviorSubject<Master> = new BehaviorSubject<Master>(undefined);
    public masterList$: BehaviorSubject<Master[]> = new BehaviorSubject<Master[]>([]);

    constructor(private readonly masterManager: MasterManagerService) {
        super();
    }

    public onMasterClick(master: Master): void {
        MasterPickerPopoverComponent.master$.next(master);
    }

    protected init(): void {
        MasterPickerPopoverComponent.master$.next(undefined);
        this.masterManager.getMasterList().pipe(
            tap((list: Master[]) => list.length === 0 ? MasterPickerPopoverComponent.master$.next(null) : null)
        ).subscribe(
            list => this.masterList$.next(list)
        );
    }
}
