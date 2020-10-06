import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MasterProfilePortfolioComponent} from './master-profile-portfolio.component';

describe('MasterProfilePortfolioComponent', () => {
  let component: MasterProfilePortfolioComponent;
  let fixture: ComponentFixture<MasterProfilePortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterProfilePortfolioComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterProfilePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
