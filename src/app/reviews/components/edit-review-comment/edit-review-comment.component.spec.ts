import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { EditReviewCommentComponent } from './edit-review-comment.component';

describe('EditReviewCommentComponent', () => {
  let component: EditReviewCommentComponent;
  let fixture: ComponentFixture<EditReviewCommentComponent>;
  let router: Router;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EditReviewCommentComponent],
        imports: [...RootModules(), ComponentTestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
