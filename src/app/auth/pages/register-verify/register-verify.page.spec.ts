import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { RegisterVerifyPage } from './register-verify.page';

describe('RegisterVerifyPage', () => {
  let component: RegisterVerifyPage;
  let fixture: ComponentFixture<RegisterVerifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterVerifyPage ],
      imports: [
          IonicModule,
          HttpClientTestingModule,
          RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterVerifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should be some tests');
});
