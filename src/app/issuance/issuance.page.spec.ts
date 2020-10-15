import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {IssuancePage} from './issuance.page';

describe('IssuancePage', () => {
  let component: IssuancePage;
  let fixture: ComponentFixture<IssuancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssuancePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IssuancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
