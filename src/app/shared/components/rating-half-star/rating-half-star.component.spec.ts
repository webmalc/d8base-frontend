import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {RatingHalfStarComponent} from './rating-half-star.component';

describe('RatingHalfStarComponent', () => {
  let component: RatingHalfStarComponent;
  let fixture: ComponentFixture<RatingHalfStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RatingHalfStarComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RatingHalfStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
