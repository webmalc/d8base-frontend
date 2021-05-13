import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { PictureSelectorComponent } from './picture-selector.component';

const initURI: string = 'https://picture0.example.com' as const;

@Component({
  selector: 'app-test-picture-selector',
  template: `
        <div [formGroup]="form">
            <app-picture-selector formControlName="avatar"></app-picture-selector>
        </div>`,
})
class AppTestFormControlComponent {
  public form: FormGroup = new FormGroup({
    avatar: new FormControl(initURI),
  });
}

describe('PictureSelectorComponent', () => {

  let wrapperComponent: AppTestFormControlComponent;
  let wrapperFixture: ComponentFixture<AppTestFormControlComponent>;
  let component: PictureSelectorComponent;
  let componentDebugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PictureSelectorComponent, AppTestFormControlComponent],
      imports: [
        ...RootModules(),
        ComponentTestingModule,
      ],
    });
    wrapperFixture = TestBed.createComponent(AppTestFormControlComponent);
    wrapperComponent = wrapperFixture.componentInstance;
    componentDebugElement = wrapperFixture.debugElement.query(By.directive(PictureSelectorComponent));
    component = componentDebugElement.componentInstance;
    wrapperFixture.detectChanges();
  });

  it('should create', () => {
    expect(wrapperComponent).toBeTruthy();
    expect(component).toBeTruthy();
  });
});
