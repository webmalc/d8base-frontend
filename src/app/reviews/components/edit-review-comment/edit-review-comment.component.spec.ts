import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StorageManagerMock } from 'src/testing/mocks';
import { EditReviewCommentComponent } from './edit-review-comment.component';

describe('EditReviewCommentComponent', () => {
  let component: EditReviewCommentComponent;
  let fixture: ComponentFixture<EditReviewCommentComponent>;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EditReviewCommentComponent],
        imports: [
          IonicModule.forRoot(),
          HttpClientTestingModule,
          RouterTestingModule,
          ReactiveFormsModule,
          FormsModule,
          TranslateModule.forRoot(),
          SharedModule,
        ],
        providers: [{ provide: StorageManagerService, useClass: StorageManagerMock }],
      }).compileComponents();
      router = TestBed.inject(Router);
      spyOn(router, 'getCurrentNavigation').and.returnValue({ extras: { state: { review: null } } } as any);
      fixture = TestBed.createComponent(EditReviewCommentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
