import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {ServiceRoutingModule} from '@app/service/service-routing.module';
import {PricesApiService} from '@app/service/services/prices-api.service';
import {ServiceLocationApiService} from '@app/service/services/service-location-api.service';
import {ServicePhotoApiService} from '@app/service/services/service-photo-api.service';
import {ServiceTagsApiService} from '@app/service/services/service-tags-api.service';
import {ServicesApiService} from '@app/service/services/services-api.service';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ServiceRoutingModule
    ],
    providers: [
        PricesApiService,
        ServicesApiService,
        ServiceTagsApiService,
        ServiceLocationApiService,
        ServicePhotoApiService
    ]
})
export class ServiceModule { }
