import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), IonicStorageModule.forRoot(), HttpClientTestingModule],
      providers: [TranslationService],
    }),
  );

  it('should be created', () => {
    const service: TranslationService = TestBed.inject(TranslationService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
