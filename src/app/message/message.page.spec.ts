import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {By} from '@angular/platform-browser';
import {RouterOutlet} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MessageBoxComponent} from './components/message-box/message-box.component';
import { MessagePage } from './message.page';

describe('MessagePage', () => {
  let component: MessagePage;
  let fixture: ComponentFixture<MessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagePage, MessageBoxComponent ],
      imports: [IonicModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.queryAll(By.directive(RouterOutlet)).length).toEqual(2);
  });
});
