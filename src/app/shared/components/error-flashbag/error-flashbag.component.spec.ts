import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';
import { ErrorFlashbagComponent } from './error-flashbag.component';

describe('ErrorFlashbagComponent', () => {
  let component: ErrorFlashbagComponent;
  let fixture: ComponentFixture<ErrorFlashbagComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ErrorFlashbagComponent],
        imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(ErrorFlashbagComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test input', () => {
    (component as any).messages = ['AAA-test-ZZZ'];

    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ion-text>div').innerText).toEqual('AAA-test-ZZZ');
  });
});
