import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Search } from '@app/api/models';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { SearchResultComponent } from './search-result.component';

const testData: Search = {
  professional: {
    id: 3,
    user: {
      id: 1,
      first_name: 'UserName',
      last_name: 'UserLastName',
      gender: null,
      avatar: '',
      avatar_thumbnail: '',
      is_confirmed: true,
      nationality: null,
      birthday: '1995-04-28',
      languages: [
        {
          id: 63,
          language: 'am',
          is_native: true,
          created: '2021-02-26T08:31:23.416090+01:00',
          modified: '2021-02-26T08:31:23.416113+01:00',
          created_by: 1,
          modified_by: 1,
        },
        {
          id: 61,
          language: 'sq',
          is_native: true,
          created: '2021-02-26T08:31:23.300354+01:00',
          modified: '2021-02-26T08:31:23.300378+01:00',
          created_by: 1,
          modified_by: 1,
        },
      ],
    },
    name: 'User prof',
    description: 'Desciption User prof',
    company: 'Comp User Prof',
    level: 'middle',
    rating: '5.00',
    reviews_count: 2,
    subcategory: 2,
    experience: 12,
    tags: [],
    contacts: [
      {
        id: 1,
        contact: 1,
        contact_display: 'twitter',
        value: 'userProf_TwitterContact',
      },
    ],
    locations: [
      {
        id: 7,
        country: 2960313,
        region: 2960315,
        subregion: 2960317,
        city: 2960316,
        district: null,
        postal_code: null,
        address: 'Lux Lux Address 43-22 str',
        coordinates: null,
        units: 0,
        timezone: 'Europe/Luxembourg',
      },
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
    modified: '2021-01-28T11:43:26.073779+01:00',
    is_saved: false,
  },
  services: [
    {
      id: 20,
      professional: 3,
      name: 'UserService with location',
      description: '',
      duration: 120,
      booking_interval: 15,
      service_type: 'professional',
      is_base_schedule: true,
      is_auto_order_confirmation: false,
      is_enabled: true,
      price: {
        id: 17,
        service: 20,
        price: '2.0000',
        price_currency: 'USD',
        start_price: null,
        start_price_currency: 'USD',
        end_price: null,
        end_price_currency: 'USD',
        is_price_fixed: true,
        payment_methods: ['cash', 'online'],
        modified: '2021-03-01T00:56:04.114682+01:00',
        created_by: 1,
        modified_by: 1,
      },
      tags: [],
      locations: [
        {
          id: 6,
          location: {
            id: 7,
            country: 2960313,
            region: 2960315,
            subregion: 2960317,
            city: 2960316,
            district: null,
            postal_code: null,
            address: 'Lux Lux Address 43-22 str',
            coordinates: null,
            units: 0,
            timezone: 'Europe/Luxembourg',
          },
          max_distance: 150,
          created: '2021-03-01T00:56:14.538321+01:00',
          modified: '2021-03-03T13:33:37.961703+01:00',
        },
      ],
      created: '2021-03-01T00:56:03.898924+01:00',
      modified: '2021-03-03T13:33:37.906543+01:00',
    },
    {
      id: 21,
      professional: 3,
      name: 'User Client Location Service',
      description: null,
      duration: 1440,
      booking_interval: 15,
      service_type: 'client',
      is_base_schedule: true,
      is_auto_order_confirmation: false,
      is_enabled: true,
      price: {
        id: 18,
        service: 21,
        price: '55.0000',
        price_currency: 'USD',
        start_price: null,
        start_price_currency: 'USD',
        end_price: null,
        end_price_currency: 'USD',
        is_price_fixed: true,
        payment_methods: ['cash', 'online'],
        modified: '2021-03-01T01:12:57.849361+01:00',
        created_by: 1,
        modified_by: 1,
      },
      tags: [],
      locations: [
        {
          id: 7,
          location: {
            id: 7,
            country: 2960313,
            region: 2960315,
            subregion: 2960317,
            city: 2960316,
            district: null,
            postal_code: null,
            address: 'Lux Lux Address 43-22 str',
            coordinates: null,
            units: 0,
            timezone: 'Europe/Luxembourg',
          },
          max_distance: 25,
          created: '2021-03-01T01:13:08.918648+01:00',
          modified: '2021-03-01T01:13:08.918669+01:00',
        },
      ],
      created: '2021-03-01T01:12:57.418099+01:00',
      modified: '2021-03-01T01:12:57.418123+01:00',
    },
    {
      id: 6,
      professional: 3,
      name: 'UserClientService01',
      description: 'UserClientService01 Description',
      duration: 60,
      booking_interval: 15,
      service_type: 'client',
      is_base_schedule: false,
      is_auto_order_confirmation: true,
      is_enabled: true,
      price: {
        id: 6,
        service: 6,
        price: '1.0000',
        price_currency: 'RUB',
        start_price: null,
        start_price_currency: 'USD',
        end_price: null,
        end_price_currency: 'USD',
        is_price_fixed: true,
        payment_methods: ['cash', 'online'],
        modified: '2020-12-16T16:09:50.613203+01:00',
        created_by: 1,
        modified_by: 1,
      },
      tags: [],
      locations: [
        {
          id: 3,
          location: {
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
          max_distance: 21,
          created: '2020-12-16T16:09:50.796921+01:00',
          modified: '2020-12-16T16:09:50.796948+01:00',
        },
      ],
      created: '2020-12-16T16:09:50.298392+01:00',
      modified: '2020-12-16T16:13:23.568760+01:00',
    },
  ],
};

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SearchResultComponent],
        imports: [...RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(SearchResultComponent);
      component = fixture.componentInstance;

      component.data = testData;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
