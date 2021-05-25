import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { TranslateModule } from '@ngx-translate/core';
import { Message } from '../../models/message';
import { ContextMenuPopoverComponent } from './context-menu-popover.component';

describe('ContextMenuPopoverComponent', () => {
  let component: ContextMenuPopoverComponent;
  let fixture: ComponentFixture<ContextMenuPopoverComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContextMenuPopoverComponent],
        imports: [IonicModule.forRoot(), TranslateModule.forRoot()],
        providers: [
          {
            provide: NavParams,
            useValue: {
              get: () => {
                const mes = new Message();
                mes.is_read = false;

                return mes;
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
