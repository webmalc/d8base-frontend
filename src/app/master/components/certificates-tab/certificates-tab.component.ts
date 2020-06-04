import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Certificate} from '@app/master/models/certificate';
import {CertificatesApiService} from '@app/master/services/certificates-api.service';

@Component({
    selector: 'app-certificates-tab',
    templateUrl: './certificates-tab.component.html',
    styleUrls: ['./certificates-tab.component.scss'],
})
export class CertificatesTabComponent implements OnInit {

    public masterId: number;

    constructor(
        public api: CertificatesApiService,
        private route: ActivatedRoute,
    ) {
    }

    public ngOnInit(): void {
        this.masterId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    }

    public getNewItem(): Certificate {
        return new Certificate();
    }

    public getPreparedCertificate(): (data: Certificate) => Certificate {
        return (data: Certificate) =>  {
            data = Object.assign({}, data);
            if (data.photo.slice(0, 7) === 'http://' || data.photo.slice(0, 8) === 'https://') {
                delete data.photo;
            }
            if (data.date) {
                data.date = data.date.slice(0, 10);
            }

            return data;
        };
    }
}
