import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MessagePageModule } from '@app/message/message.module';
import { IntervalService } from '@app/message/shared/interval.service';
import { of } from 'rxjs';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { ChatsListPageComponent } from './chats-list-page.component';

describe('ChatsListPageComponent', () => {
  let component: ChatsListPageComponent;
  let fixture: ComponentFixture<ChatsListPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [...RootModules(), ComponentTestingModule, MessagePageModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          {
            provide: IntervalService,
            useValue: {
              ticks: () => of(void 0),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ChatsListPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
