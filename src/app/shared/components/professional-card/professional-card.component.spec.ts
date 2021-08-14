import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProfessionalList } from '@app/api/models/professional-list';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { ProfessionalCardComponent } from './professional-card.component';

describe('ProfessionalCardComponent', () => {
  let component: ProfessionalCardComponent;
  let fixture: ComponentFixture<ProfessionalCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [ProfessionalCardComponent],
        imports: [...RootModules(), ComponentTestingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfessionalCardComponent);
      component = fixture.componentInstance;
      component.professional = {} as ProfessionalList;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
