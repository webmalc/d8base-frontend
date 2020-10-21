import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {IssuanceFiltersMainTabComponent} from './issuance-filters-main-tab.component';

describe('IssuanceFiltersMainTabComponent', () => {
  let component: IssuanceFiltersMainTabComponent;
  let fixture: ComponentFixture<IssuanceFiltersMainTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssuanceFiltersMainTabComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IssuanceFiltersMainTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
