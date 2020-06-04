import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {IonButton, IonicModule} from '@ionic/angular';

import {MessageInstanceListComponent} from './message-instance-list.component';
import {BOX_TYPE} from '../../providers/box-type.provider';
import {TranslateModule} from '@ngx-translate/core';
import {MessageFixture} from '../../../../testing/fixtures/message-fixture';
import {MessageBoxType} from '../../enums/message-box-type';
import {By} from '@angular/platform-browser';
import {MessageInterface} from '../../interfaces/message-interface';
import {MessagePageRoutingModule} from '../../message-routing.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MessageInboxResolver} from '../../resolvers/message-inbox.resolver';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MessageInstanceListComponent', () => {
    let component: MessageInstanceListComponent;
    let fixture: ComponentFixture<MessageInstanceListComponent>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessageInstanceListComponent],
            imports: [
                IonicModule,
                TranslateModule.forRoot(),
                MessagePageRoutingModule,
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: BOX_TYPE,
                    useValue: MessageBoxType.INBOX
                },
                MessageInboxResolver
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MessageInstanceListComponent);
        component = fixture.componentInstance;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should take the message and draw it', () => {
        component.message = MessageFixture.create(1);
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.directive(IonButton)).length).toEqual(3);

        component.boxType = MessageBoxType.OUTBOX;
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.directive(IonButton)).length).toEqual(2);
    });

    xit('should make button disabled when message was readed', () => {
        // component.message = MessageFixture.create();
        // fixture.detectChanges();
        // expect(component.isRead()).toBeFalsy();
        // expect(fixture.debugElement.query(By.css('.make-read')).nativeElement.disabled).toBeTruthy();
        // component.readMessage();
        // component.message.isRead = true;
        // fixture.detectChanges();
        // expect(component.isRead()).toBeTruthy();
        // expect(fixture.debugElement.query(By.css('.make-read')).nativeElement.disabled).toBeFalsy();
        // expect(component.isOpened).toBeTrue();
    });

    it('should generate events when click button fired', fakeAsync(() => {
        const message: MessageInterface = MessageFixture.create(2);
        component.message = message;
        fixture.detectChanges();
        tick();
        spyOn(component, 'deleteMessage').and.callThrough();
        component.delete.subscribe(
            id => expect(id).toEqual(message.id)
        );
        spyOn(component, 'doReply').and.callThrough();
        component.reply.subscribe(
            id => expect(id).toEqual(message.id)
        );
        const buttonDE = fixture.debugElement.queryAll(By.directive(IonButton));
        buttonDE.forEach(button => button.nativeElement.click());
        expect(component.deleteMessage).toHaveBeenCalled();
        expect(component.doReply).toHaveBeenCalled();
    }));
});
