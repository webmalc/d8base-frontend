import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { MasterProfileInfoComponent } from './master-profile-info.component';

describe('MasterProfileInfoComponent', () => {
  let component: MasterProfileInfoComponent;
  let fixture: ComponentFixture<MasterProfileInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MasterProfileInfoComponent],
      imports: [
        ...RootModules(),
        ComponentTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
