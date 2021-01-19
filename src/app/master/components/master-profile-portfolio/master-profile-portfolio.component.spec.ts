import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { StorageManagerService } from '@app/core/proxies/storage-manager.service';
import { MasterProfileContextService } from '@app/master/services/master-profile-context.service';
import { IonicModule } from '@ionic/angular';
import { StorageManagerMock } from 'src/testing/mocks';
import { MasterProfilePortfolioComponent } from './master-profile-portfolio.component';

describe('MasterProfilePortfolioComponent', () => {
  let component: MasterProfilePortfolioComponent;
  let fixture: ComponentFixture<MasterProfilePortfolioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MasterProfilePortfolioComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [
        MasterProfileContextService,
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

    fixture = TestBed.createComponent(MasterProfilePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
