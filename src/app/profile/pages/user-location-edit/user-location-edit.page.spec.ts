import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { UserLocationEditPage } from './user-location-edit.page';

describe('UserLocationEditPage', () => {
  let component: UserLocationEditPage;
  let fixture: ComponentFixture<UserLocationEditPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserLocationEditPage],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              params: {
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                pipe: () => of(),
              },
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(UserLocationEditPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
