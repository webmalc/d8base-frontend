import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {AbstractContactsComponent} from './abstract-contacts.component';

describe('AbstractContactsComponent', () => {
  let component: AbstractContactsComponent;
  let fixture: ComponentFixture<AbstractContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbstractContactsComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AbstractContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
