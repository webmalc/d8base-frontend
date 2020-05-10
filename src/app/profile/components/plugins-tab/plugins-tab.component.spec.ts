import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PluginsTabComponent } from './plugins-tab.component';
import {ReactiveFormsModule} from '@angular/forms';
import {PluginApiService} from '../../services/plugin-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserPluginApiService} from '../../services/user-plugin-api.service';
import {PluginsFormService} from '../../forms/plugins-form.service';

describe('PluginsTabComponent', () => {
  let component: PluginsTabComponent;
  let fixture: ComponentFixture<PluginsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluginsTabComponent ],
      imports: [IonicModule.forRoot(), ReactiveFormsModule, HttpClientTestingModule],
      providers: [
          PluginApiService,
          UserPluginApiService,
          PluginsFormService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PluginsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should be some tests');
});
