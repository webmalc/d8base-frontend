import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProfessionalList } from '@app/api/models/professional-list';
import { NgDestroyService } from '@app/core/services';
import { ProfessionalPhotosEditorService } from '@app/professional/services/professional-photos-editor.service';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { ProfessionalCardLargeComponent } from './professional-card-large.component';

const MOCK_PROFESSIONAL: ProfessionalList = {} as ProfessionalList;

describe('ProfessionalCardLargeComponent', () => {
  let component: ProfessionalCardLargeComponent;
  let fixture: ComponentFixture<ProfessionalCardLargeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [ProfessionalCardLargeComponent],
        imports: [...RootModules(), ComponentTestingModule],
        providers: [NgDestroyService, ProfessionalPhotosEditorService],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfessionalCardLargeComponent);
      component = fixture.componentInstance;
      component.professional = MOCK_PROFESSIONAL;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
