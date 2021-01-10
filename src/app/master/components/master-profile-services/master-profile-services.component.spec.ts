import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StorageManagerMock } from 'src/testing/mocks';
import { StorageManagerService } from '../../../core/proxies/storage-manager.service';
import { MasterProfileServicesComponent } from './master-profile-services.component';

describe('MasterProfileServicesComponent', () => {
  let component: MasterProfileServicesComponent;
  let fixture: ComponentFixture<MasterProfileServicesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MasterProfileServicesComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: {
                get(): string {
                  return '';
                },
              },
            },
          },
        },
        { provide: StorageManagerService, useClass: StorageManagerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterProfileServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
