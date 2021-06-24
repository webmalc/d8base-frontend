import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ContactEditComponent } from './contact-edit.component';

describe('ContactEditComponent', () => {
  let component: ContactEditComponent;
  let fixture: ComponentFixture<ContactEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ContactEditComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [FormBuilder],
      }).compileComponents();

      fixture = TestBed.createComponent(ContactEditComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
