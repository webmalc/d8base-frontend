import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
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
              snapshot: {
                paramMap: {
                  get(): string {
                    return '';
                  },
                },
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
