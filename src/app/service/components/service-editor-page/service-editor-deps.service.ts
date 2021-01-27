import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '@app/api/services';

@Injectable()
export class ServiceEditorDepsService {
  constructor(
    public readonly router: Router,
    public readonly api: AccountsService,
  ) {
  }
}
