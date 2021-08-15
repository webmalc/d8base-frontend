import { CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, State } from '@ngxs/store';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { ProfessionalPageComponent } from './professional-page.component';

@State({
  name: 'MockState',
  defaults: { professional: {} },
})
@Injectable()
class MockState {}

describe('MasterPage', () => {
  let component: ProfessionalPageComponent;
  let fixture: ComponentFixture<ProfessionalPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [ProfessionalPageComponent],
        imports: [...RootModules(), ComponentTestingModule, NgxsModule.forRoot([MockState])],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfessionalPageComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should be some tests');
});
