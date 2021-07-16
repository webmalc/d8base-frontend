import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { IonicModule, NavParams } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { OnMapPopoverComponent } from './on-map-popover.component';

describe('OnMapPopoverComponent', () => {
  let component: OnMapPopoverComponent;
  let fixture: ComponentFixture<OnMapPopoverComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [OnMapPopoverComponent],
        imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
        providers: [{ provide: NavParams, useValue: { get: () => null } }, FormBuilder],
      }).compileComponents();

      fixture = TestBed.createComponent(OnMapPopoverComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
