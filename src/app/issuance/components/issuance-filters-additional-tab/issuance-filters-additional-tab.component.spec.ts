import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {IssuanceFiltersAdditionalTabComponent} from './issuance-filters-additional-tab.component';

describe('IssuanceFiltersAdditionalTabComponent', () => {
  let component: IssuanceFiltersAdditionalTabComponent;
  let fixture: ComponentFixture<IssuanceFiltersAdditionalTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssuanceFiltersAdditionalTabComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IssuanceFiltersAdditionalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
