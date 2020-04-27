import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiClientService} from '@app/core/services/api-client.service';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-register-verify',
    templateUrl: './register-verify.page.html',
    styleUrls: ['./register-verify.page.scss'],
})
export class RegisterVerifyPage implements OnInit {

    public success: boolean = false;
    private readonly VERIFY_URL = environment.backend.verify_registration;

    constructor(private client: ApiClientService, private activatedRoute: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(
            params => {
                this.sendVerifyRequest(
                    {user_id: params.user_id, timestamp: params.timestamp, signature: params.signature}
                ).subscribe(
                    resp => this.success = true
                );
            }
        );
    }

    private sendVerifyRequest(data: { user_id: string, timestamp: string, signature: string }): Observable<any> {
        return this.client.post(this.VERIFY_URL, data);
    }
}
