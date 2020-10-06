import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {AbstractLocationEditComponent} from './abstract-location-edit.component';

describe('AbstractLocationEditComponent', () => {
  let component: AbstractLocationEditComponent;
  let fixture: ComponentFixture<AbstractLocationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbstractLocationEditComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AbstractLocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
