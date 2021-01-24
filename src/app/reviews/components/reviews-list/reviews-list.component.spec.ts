import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { StorageManagerMock } from 'src/testing/mocks';
import { ReviewsListComponent } from './reviews-list.component';

describe('ReviewsListComponent', () => {
  let component: ReviewsListComponent;
  let fixture: ComponentFixture<ReviewsListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ReviewsListComponent],
        imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot(), SharedModule, RouterTestingModule],
        providers: [
          { provide: StorageManagerService, useClass: StorageManagerMock },
          {
            provide: ActivatedRoute,
            useValue: {
              params: of({ professionalId: 3 }),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ReviewsListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
