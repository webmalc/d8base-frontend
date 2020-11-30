import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {User} from '@app/core/models/user';
import {PhotoSanitizerService} from '@app/core/services/photo-sanitizer.service';
import {MasterList} from '@app/master/models/master-list';
import {Price} from '@app/service/models/price';
import {Service} from '@app/service/models/service';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {SearchResultComponent} from './search-result.component';

describe('SearchResultComponent', () => {
    let component: SearchResultComponent;
    let fixture: ComponentFixture<SearchResultComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SearchResultComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot(), RouterTestingModule],
            providers: [
                {provide: PhotoSanitizerService, useValue: {sanitize: (data: any): any => data}}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SearchResultComponent);
        component = fixture.componentInstance;

        const master = new MasterList();
        master.level = 'senior';
        master.company = 'company';
        master.rating = '3';
        master.name = 'nmame';
        master.description = 'desc';
        master.id = 1;
        const user = new User();
        user.first_name = 'test';
        user.last_name = 'test';
        user.is_confirmed = true;
        master.user = user;
        const service = new Service();
        service.professional = master.id;
        service.name = 'service';
        const price = new Price();
        price.is_price_fixed = true;
        price.price_currency = 'cur';
        price.price = 12;
        service.price = price;


        component.data = {master, services: [service]};
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
