import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComponentTestingModule, RootModules } from '../../testing/component-testing.module';
import { LandingPage } from './landing.page';

describe('LandingPage', () => {
  let component: LandingPage;
  let fixture: ComponentFixture<LandingPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LandingPage],
        imports: [...RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(LandingPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
