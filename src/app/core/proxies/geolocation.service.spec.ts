import { TestBed } from '@angular/core/testing';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeolocationService } from './geolocation.service';

describe('GeolocationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: Geolocation, useValue: { getCurrentPosition: () => Promise.resolve() } }],
    }),
  );

  it('should be created', () => {
    const service: GeolocationService = TestBed.inject(GeolocationService);
    expect(service).toBeTruthy();
  });

  xit('should be some tests');
});
