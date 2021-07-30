import { TestBed } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [...RootModules(), ComponentTestingModule],
      providers: [TranslationService],
    }),
  );

  it('should be created', () => {
    const service: TranslationService = TestBed.inject(TranslationService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
