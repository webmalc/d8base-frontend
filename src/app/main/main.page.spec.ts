import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IpApiService} from '@app/core/services/location/ip-api.service';
import {IpDataService} from '@app/core/services/location/ip-data.service';
import {IpServicesHolderService} from '@app/core/services/location/ip-services-holder.service';
import {IpnfDataService} from '@app/core/services/location/ipnf-data.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LocationAccuracy} from '@ionic-native/location-accuracy/ngx';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {MainPage} from './main.page';

describe('MainPage', () => {
    let component: MainPage;
    let fixture: ComponentFixture<MainPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [MainPage],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot(), HttpClientTestingModule],
            providers: [
                IpServicesHolderService,
                IpApiService,
                IpDataService,
                IpnfDataService,
                {provide: Geolocation, useValue: {getCurrentPosition: () => 'test'}},
                {provide: LocationAccuracy, useValue: {canRequest: () => true, REQUEST_PRIORITY_HIGH_ACCURACY: 'test'}}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MainPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
