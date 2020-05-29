import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagePage } from './message.page';
import {MessageBoxComponent} from './components/message-box/inbox.component';
import {OutboxComponent} from './components/outbox/outbox.component';
import {By} from '@angular/platform-browser';

describe('MessagePage', () => {
  let component: MessagePage;
  let fixture: ComponentFixture<MessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagePage, MessageBoxComponent, OutboxComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.query(By.directive(MessageBoxComponent))).toBeTruthy();
    expect(fixture.debugElement.query(By.directive(OutboxComponent))).toBeTruthy();
  });
});
