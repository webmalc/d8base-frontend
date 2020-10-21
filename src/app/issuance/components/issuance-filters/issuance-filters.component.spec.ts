import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {IssuanceFiltersComponent} from './issuance-filters.component';

describe('IssuanceFiltersComponent', () => {
  let component: IssuanceFiltersComponent;
  let fixture: ComponentFixture<IssuanceFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssuanceFiltersComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IssuanceFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
