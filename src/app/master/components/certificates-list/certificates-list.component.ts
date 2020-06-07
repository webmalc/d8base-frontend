import {Component, Input, OnInit} from '@angular/core';
import {Certificate} from '@app/master/models/certificate';
import {CertificatesApiService} from '@app/master/services/certificates-api.service';
import {AbstractListComponent} from '@app/shared/components/abstract-list/abstract-list.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-certificates-list',
    templateUrl: './certificates-list.component.html',
    styleUrls: ['./certificates-list.component.scss'],
})
export class CertificatesListComponent extends AbstractListComponent<Certificate> implements OnInit {

    @Input() public masterId: number;

    constructor() {
        super();
    }

    public ngOnInit(): void {
        super.ngOnInit();
    }

    protected getItems(): Observable<Certificate[]> {
        return (this.apiService as CertificatesApiService).getByMasterId(this.masterId).pipe(
            map(raw => raw.results)
        );
    }
}
