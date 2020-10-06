import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {MasterProfileFactoryComponent} from './master-profile-factory.component';

describe('MasterProfileFactoryComponent', () => {
  let component: MasterProfileFactoryComponent;
  let fixture: ComponentFixture<MasterProfileFactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MasterProfileFactoryComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterProfileFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
