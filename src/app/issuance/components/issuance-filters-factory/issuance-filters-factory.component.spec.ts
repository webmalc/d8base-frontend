import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {IssuanceFiltersFactoryComponent} from './issuance-filters-factory.component';

describe('IssuanceFiltersFactoryComponent', () => {
  let component: IssuanceFiltersFactoryComponent;
  let fixture: ComponentFixture<IssuanceFiltersFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssuanceFiltersFactoryComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IssuanceFiltersFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
