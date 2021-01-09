import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { Search } from '../../../api/models';
import { SearchResultComponent } from './search-result.component';

const testData: Search = {
    professional: {
        id: 3,
        user: {
            id: 1,
            first_name: 'UserName',
            last_name: 'UserLastName',
            gender: null,
            avatar: null,
            avatar_thumbnail: null,
            is_confirmed: true,
            nationality: null,
            birthday: null,
            languages: [],
        },
        name: 'User prof',
        description: 'Desciption User prof',
        company: 'Comp User Prof',
        level: 'middle',
        rating: null,
        subcategory: 1,
        experience: 12,
        tags: [],
        contacts: [],
        locations: [
            {
                id: 3,
                country: 2960313,
                region: null,
                subregion: null,
                city: null,
                district: null,
                postal_code: null,
                address: 'User Addres Lux',
                coordinates: null,
                units: 0,
                timezone: null,
            },
        ],
        experience_entries: [],
        educations: [],
        certificates: [],
        created: '2020-12-02T09:57:42.673166+01:00',
        modified: '2020-12-02T16:38:49.335072+01:00',
    },
    services: [
        {
            id: 4,
            professional: 3,
            name: 'User Service Online',
            description: 'Description User Prof Service',
            duration: 45,
            booking_interval: 90,
            service_type: 'online',
            is_base_schedule: true,
            is_auto_order_confirmation: true,
            is_enabled: true,
            price: {
                id: 4,
                service: 4,
                price: '33.0000',
                price_currency: 'USD',
                start_price: null,
                start_price_currency: 'USD',
                end_price: null,
                end_price_currency: 'USD',
                is_price_fixed: true,
                payment_methods: [
                    'cash',
                ],
                modified: '2020-12-02T10:00:11.909500+01:00',
                created_by: 1,
                modified_by: 1,
            },
            tags: [],
            locations: [],
            created: '2020-12-02T10:00:11.902848+01:00',
            modified: '2020-12-06T18:25:42.086759+01:00',
        },
    ],
};

describe('SearchResultComponent', () => {
    let component: SearchResultComponent;
    let fixture: ComponentFixture<SearchResultComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SearchResultComponent],
            imports: [IonicModule.forRoot(), TranslateModule.forRoot(), RouterTestingModule],
        }).compileComponents();

        fixture = TestBed.createComponent(SearchResultComponent);
        component = fixture.componentInstance;

        component.data = testData;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
