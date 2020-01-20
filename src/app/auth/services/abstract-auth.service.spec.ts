import { TestBed } from '@angular/core/testing';

import { AbstractAuthService } from './abstract-auth.service';
import {HttpClient} from '@angular/common/http';

describe('AbstractAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: HttpClient, useValue: { post: () => {} }}
    ]
  }));

  it('should be created', () => {
    const service: AbstractAuthService = TestBed.get(AbstractAuthService);
    expect(service).toBeTruthy();
  });
});
