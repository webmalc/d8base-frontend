import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HintPopoverComponent } from './hint-popover.component';

describe('HintPopoverComponent', () => {
  let component: HintPopoverComponent;
  let fixture: ComponentFixture<HintPopoverComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HintPopoverComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(HintPopoverComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
