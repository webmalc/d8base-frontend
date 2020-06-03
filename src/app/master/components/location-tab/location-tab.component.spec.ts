import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationTabComponent } from './location-tab.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {LocationListComponent} from '../../../shared/components/location/location-list.component';

describe('MasterLocationTabComponent', () => {
  let component: LocationTabComponent;
  let fixture: ComponentFixture<LocationTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationTabComponent, LocationListComponent ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
