import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormBuilder} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ExperienceApiService} from '../../services/experience-api.service';
import { ExperienceTabComponent } from './experience-tab.component';

describe('ExperienceTabComponent', () => {
  let component: ExperienceTabComponent;
  let fixture: ComponentFixture<ExperienceTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceTabComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule],
      providers: [FormBuilder, ExperienceApiService]
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
