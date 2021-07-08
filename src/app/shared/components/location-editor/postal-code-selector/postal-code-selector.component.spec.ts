import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { PostalCodeSelectorComponent } from './postal-code-selector.component';

describe('PostalCodeSelectorComponent', () => {
  let component: PostalCodeSelectorComponent;
  let fixture: ComponentFixture<PostalCodeSelectorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PostalCodeSelectorComponent],
        imports: [...RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(PostalCodeSelectorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
