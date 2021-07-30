import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { MainMenuComponent } from './main-menu.component';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(
    waitForAsync(() => {
      const storageMock: Partial<Storage> = {
        get: jasmine.createSpy('get').and.returnValue(Promise.resolve(null)),
        set: jasmine.createSpy('set').and.returnValue(Promise.resolve(null)),
      };
      TestBed.configureTestingModule({
        declarations: [MainMenuComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [{ provide: Storage, useValue: storageMock }],
      }).compileComponents();

      fixture = TestBed.createComponent(MainMenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
