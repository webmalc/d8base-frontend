import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { HintComponent } from './hint.component';

describe('HintComponent', () => {
  let component: HintComponent;
  let fixture: ComponentFixture<HintComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HintComponent],
        imports: [...RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(HintComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
