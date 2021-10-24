import { Component } from '@angular/core';
import { ServiceList, ProfessionalList } from '@app/api/models';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavBranch, NavPath } from '@app/core/constants/navigation.constants';

@Component({
  selector: 'app-service-created-page',
  templateUrl: './service-created-page.component.html',
  styleUrls: ['./service-created-page.component.scss'],
})
export class ServiceCreatedPageComponent {
  public service$: Observable<ServiceList>;
  public professional$: Observable<ProfessionalList>;

  constructor(private readonly route: ActivatedRoute) {
    this.service$ = route.data.pipe(map(data => data.service));
    this.professional$ = route.data.pipe(map(data => data.professional));
  }

  public get addNewServiceUrl(): any[] {
    return ['/', NavPath.Service, NavBranch.Add];
  }

  public get professionalServicesUrl(): string {
    return `/${NavPath.Professional}/${NavBranch.Services}`;
  }
}
