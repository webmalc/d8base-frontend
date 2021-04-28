import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Actions } from '@ngxs/store';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ChangeEmailComponent } from './change-email.component';

describe('ChangeEmailComponent', () => {
  let component: ChangeEmailComponent;
  let fixture: ComponentFixture<ChangeEmailComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChangeEmailComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [Actions],
      }).compileComponents();

      fixture = TestBed.createComponent(ChangeEmailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
