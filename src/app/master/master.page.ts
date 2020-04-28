import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Master} from '@app/core/models/master';
import {MasterManagerService} from '@app/core/services/master-manager.service';
import {BehaviorSubject} from 'rxjs';

@Component({
    selector: 'app-master',
    templateUrl: './master.page.html',
    styleUrls: ['./master.page.scss'],
})
export class MasterPage implements OnInit {

    public masterList$: BehaviorSubject<Master[]> = new BehaviorSubject<Master[]>([]);

    constructor(private masterManager: MasterManagerService, private router: Router) { }

    public ngOnInit(): void {
        this.initMasterList();
    }

    public onMasterClick(event: MouseEvent): any {
        const masterId: number = (event.target as any).getAttribute('masterId');
        this.router.navigateByUrl('/professional/edit/' + masterId);
    }

    private initMasterList(): void {
        this.masterManager.getMasterList().subscribe(
            (list: Master[]) => this.masterList$.next(list)
        );
    }
}
