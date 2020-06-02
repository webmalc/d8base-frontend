import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {IonButton, IonicModule} from '@ionic/angular';

import { MessageInstanceComponent } from './message-instance.component';
import {BOX_TYPE, boxTypeProvider} from '../../providers/box-type.provider';
import {TranslateModule} from '@ngx-translate/core';
import {MessageFixture} from '../../../../testing/fixtures/message-fixture';
import {MessageBoxType} from '../../enums/message-box-type';
import {By} from '@angular/platform-browser';
import {MessageInterface} from '../../interfaces/message-interface';

describe('MessageInstanceComponent', () => {
  let component: MessageInstanceComponent;
  let fixture: ComponentFixture<MessageInstanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageInstanceComponent ],
      imports: [IonicModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: BOX_TYPE,
          useValue: MessageBoxType.INBOX
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageInstanceComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should take the message and draw it', () => {
    component.message = MessageFixture.create(1);
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.directive(IonButton)).length).toEqual(4);

    component.boxType = MessageBoxType.OUTBOX;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.directive(IonButton)).length).toEqual(2);
  });

  it('should make button disabled when message was readed', () => {
    component.message = MessageFixture.create();
    fixture.detectChanges();
    expect(component.isRead()).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.make-read')).nativeElement.disabled).toBeTruthy();
    component.readMessage();
    component.message.isRead = true;
    fixture.detectChanges();
    expect(component.isRead()).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.make-read')).nativeElement.disabled).toBeFalsy();
    expect(component.isOpened).toBeTrue();
  });

  it('should generate events because buttons click', () => {
    const message: MessageInterface = MessageFixture.create(2);
    component.message = message;
    fixture.detectChanges();
    spyOn(component, 'deleteMessage').and.callThrough();
    component.delete.subscribe(
        id => expect(id).toEqual(message.id)
    );
    spyOn(component, 'readMessage').and.callThrough();
    component.read.subscribe(
        id => expect(id).toEqual(message.id)
    );
    spyOn(component, 'makeUnread').and.callThrough();
    component.unread.subscribe(
        id => expect(id).toEqual(message.id)
    );
    spyOn(component, 'doReply').and.callThrough();
    component.reply.subscribe(
        id => expect(id).toEqual(message.id)
    );
    const buttonDE = fixture.debugElement.queryAll(By.directive(IonButton));
    buttonDE.forEach(button => button.nativeElement.click());
    expect(component.deleteMessage).toHaveBeenCalled();
    expect(component.readMessage).toHaveBeenCalled();
    expect(component.makeUnread).toHaveBeenCalled();
    expect(component.doReply).toHaveBeenCalled();
  });
});
