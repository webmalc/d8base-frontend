import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, State } from '@ngxs/store';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';
import { MasterProfileInfoComponent } from './master-profile-info.component';

@State({
  name: 'MockState',
  defaults: { professional: {} },
})
@Injectable()
class MockState {}

describe('MasterProfileInfoComponent', () => {
  let component: MasterProfileInfoComponent;
  let fixture: ComponentFixture<MasterProfileInfoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MasterProfileInfoComponent],
        imports: [...RootModules(), ComponentTestingModule, NgxsModule.forRoot([MockState])],
      }).compileComponents();

      fixture = TestBed.createComponent(MasterProfileInfoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
