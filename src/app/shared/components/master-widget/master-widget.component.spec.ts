import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProfessionalList } from '@app/api/models/professional-list';
import { IonicModule } from '@ionic/angular';

import { MasterWidgetComponent } from './master-widget.component';

describe('MasterWidgetComponent', () => {
  let component: MasterWidgetComponent;
  let fixture: ComponentFixture<MasterWidgetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MasterWidgetComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterWidgetComponent);
    component = fixture.componentInstance;
    component.master = {} as ProfessionalList;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
