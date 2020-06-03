import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserLocationMapComponent } from './user-location-map.component';

describe('UserLocationMapComponent', () => {
  let component: UserLocationMapComponent;
  let fixture: ComponentFixture<UserLocationMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLocationMapComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserLocationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
