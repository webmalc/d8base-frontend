import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {IssuanceFiltersSubmenuComponent} from './issuance-filters-submenu.component';

describe('IssuanceFiltersSubmenuComponent', () => {
  let component: IssuanceFiltersSubmenuComponent;
  let fixture: ComponentFixture<IssuanceFiltersSubmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssuanceFiltersSubmenuComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IssuanceFiltersSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
