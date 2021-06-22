import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MessagePageModule } from '@app/message/message.module';
import { NavParams } from '@ionic/angular';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ChatItem } from '../chat-item.interface';

import { ContextMenuPopoverComponent } from './context-menu-popover.component';

describe('ContextMenuPopoverComponent', () => {
  let component: ContextMenuPopoverComponent;
  let fixture: ComponentFixture<ContextMenuPopoverComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [...RootModules(), ComponentTestingModule, MessagePageModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          {
            provide: NavParams,
            useValue: {
              get: () => {
                const message: ChatItem = {
                  trackById: '11',
                  messageId: 11,
                  type: 'sent',
                  timestamp: new Date('2021-01-01'),
                };

                return message;
              },
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ContextMenuPopoverComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
