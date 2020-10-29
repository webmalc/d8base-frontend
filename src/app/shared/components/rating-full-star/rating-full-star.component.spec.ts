import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {RatingFullStarComponent} from './rating-full-star.component';

describe('RatingFullStarComponent', () => {
  let component: RatingFullStarComponent;
  let fixture: ComponentFixture<RatingFullStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatingFullStarComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RatingFullStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
