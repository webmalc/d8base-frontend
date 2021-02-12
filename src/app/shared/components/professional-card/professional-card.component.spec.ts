import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfessionalList } from '@app/api/models/professional-list';
import { IonicModule } from '@ionic/angular';

import { ProfessionalCardComponent } from './professional-card.component';

describe('ProfessionalCardComponent', () => {
  let component: ProfessionalCardComponent;
  let fixture: ComponentFixture<ProfessionalCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProfessionalCardComponent],
        imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
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
