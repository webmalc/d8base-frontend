import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MasterProfileReviewComponent } from './master-profile-review.component';

describe('MasterProfileReviewComponent', () => {
  let component: MasterProfileReviewComponent;
  let fixture: ComponentFixture<MasterProfileReviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MasterProfileReviewComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterProfileReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
