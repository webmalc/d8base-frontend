import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { PaymentMethodEditorComponent } from './payment-method-editor.component';

describe('PaymentMethodEditorComponent', () => {
  let component: PaymentMethodEditorComponent;
  let fixture: ComponentFixture<PaymentMethodEditorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PaymentMethodEditorComponent],
        imports: [TranslateModule.forRoot(), IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(PaymentMethodEditorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
