import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { UserSavedProfessionalsListComponent } from './user-saved-professionals.component';

describe('UserSavedProfessionalsListComponent', () => {
  let component: UserSavedProfessionalsListComponent;
  let fixture: ComponentFixture<UserSavedProfessionalsListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserSavedProfessionalsListComponent],
        imports: [...RootModules(), ComponentTestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(UserSavedProfessionalsListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
