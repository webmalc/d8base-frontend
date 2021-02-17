import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ComponentTestingModule, ROOT_MODULES } from 'src/testing/component-testing.module';

import { GenderSelectorComponent } from './gender-selector.component';

describe('GenderSelectorComponent', () => {
  let component: GenderSelectorComponent;
  let fixture: ComponentFixture<GenderSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GenderSelectorComponent ],
      imports: [
        ...ROOT_MODULES,
        ComponentTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GenderSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
