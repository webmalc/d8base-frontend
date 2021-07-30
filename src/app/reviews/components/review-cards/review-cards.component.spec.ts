import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StorageManagerService } from '@app/core/services/storage-manager.service';
import { ReviewsModule } from '@app/reviews/reviews.module';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { StorageManagerMock } from 'src/testing/mocks';
import { ReviewCardsComponent } from './review-cards.component';

describe('ReviewCardsComponent', () => {
  let component: ReviewCardsComponent;
  let fixture: ComponentFixture<ReviewCardsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ReviewCardsComponent],
        imports: [...RootModules(), ComponentTestingModule, ReviewsModule],
        providers: [{ provide: StorageManagerService, useClass: StorageManagerMock }],
      }).compileComponents();

      fixture = TestBed.createComponent(ReviewCardsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
