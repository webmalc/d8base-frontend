import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MainPageModule } from '@app/main/main.module';
import { ComponentTestingModule, RootModules } from 'src/testing/component-testing.module';

import { ProfessionalPromoComponent } from './professional-promo.component';

describe('ProfessionalPromoComponent', () => {
  let component: ProfessionalPromoComponent;
  let fixture: ComponentFixture<ProfessionalPromoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [...RootModules(), ComponentTestingModule, MainPageModule],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfessionalPromoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
