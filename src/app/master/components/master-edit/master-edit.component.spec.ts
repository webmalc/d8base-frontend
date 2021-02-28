import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { MasterEditComponent } from './master-edit.component';

describe('MasterEditComponent', () => {
  let component: MasterEditComponent;
  let fixture: ComponentFixture<MasterEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterEditComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [FormBuilder],
      }).compileComponents();

      fixture = TestBed.createComponent(MasterEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
