import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { MyOrdersModule } from '@app/my-orders/my-orders.module';
import { SharedModule } from '@app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StorageManagerMock } from 'src/testing/mocks';
import { EditReviewComponent } from './edit-review.component';

describe('EditReviewComponent', () => {
  let component: EditReviewComponent;
  let fixture: ComponentFixture<EditReviewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EditReviewComponent],
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

      fixture = TestBed.createComponent(EditReviewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
