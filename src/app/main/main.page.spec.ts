import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { IpApiService } from '@app/core/services/location/ip-api.service';
import { IpDataService } from '@app/core/services/location/ip-data.service';
import { IpServicesHolderService } from '@app/core/services/location/ip-services-holder.service';
import { IpnfDataService } from '@app/core/services/location/ipnf-data.service';
import { DefaultCategoriesFactoryService } from '@app/main/services/default-categories-factory.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from '../../testing/mocks';
import { MainPage } from './main.page';

describe('MainPage', () => {
  let component: MainPage;
  let fixture: ComponentFixture<MainPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MainPage],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [
          IpServicesHolderService,
          IpApiService,
          IpDataService,
          IpnfDataService,
          { provide: Geolocation, useValue: { getCurrentPosition: () => 'test' } },
          { provide: LocationAccuracy, useValue: { canRequest: () => true, REQUEST_PRIORITY_HIGH_ACCURACY: 'test' } },
          { provide: StorageManagerService, useClass: StorageManagerMock },
          DefaultCategoriesFactoryService,
          FormBuilder,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(MainPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
