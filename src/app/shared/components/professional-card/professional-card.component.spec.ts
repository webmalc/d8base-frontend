import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProfessionalList } from '@app/api/models/professional-list';
import { IonicModule } from '@ionic/angular';

import { ProfessionalCardComponent } from './professional-card.component';

describe('ProfessionalCardComponent', () => {
  let component: ProfessionalCardComponent;
  let fixture: ComponentFixture<ProfessionalCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalCardComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalCardComponent);
    component = fixture.componentInstance;
    component.professional = {} as ProfessionalList;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
