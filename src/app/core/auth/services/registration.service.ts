import { Injectable } from '@angular/core';
import {UserModel} from '../../../shared/models/user.model';
import {Observable} from 'rxjs';
import {AbstractAuthService} from './abstract-auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class RegistrationService extends AbstractAuthService {

  private readonly REGISTER_URL = environment.backend.api_register_url;

  constructor(protected http: HttpClient) {
    super(http);
  }

  public register(user: UserModel): Observable<boolean> {

  }
}
