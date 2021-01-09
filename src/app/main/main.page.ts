import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ExtendedLocation} from '@app/core/models/extended-location';
import {CurrentLocationCompilerService} from '@app/core/services/location/current-location-compiler.service';
import {DefaultCategoryList} from '@app/main/enums/default-category-list';
import {MainPageSearchInterface} from '@app/main/interfaces/main-page-search-interface';
import {SearchLocationDataInterface} from '@app/main/interfaces/search-location-data-interface';
import {DefaultCategoriesFactoryService} from '@app/main/services/default-categories-factory.service';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

    public searchData: MainPageSearchInterface;
    public locationEnabled = false;
    public defaultCategoryList = DefaultCategoryList;

    constructor(
        private readonly currentLocation: CurrentLocationCompilerService,
        private readonly router: Router,
        private readonly defaultCategory: DefaultCategoriesFactoryService,
    ) {
    }

    public ngOnInit(): void {
        this.initSearchData();
        this.getCurrentLocation().subscribe(
            data => {
                if (data) {
                    this.searchData.location = {
                        country: data.country,
                        city: data.city,
                        coordinates: data.coords,
                    };
                }
            },
            err => this.locationEnabled = true,
            () => this.locationEnabled = true,
        );
    }

    public useCategory(categoryName: string): void {
        const cat = this.defaultCategory.getByName(categoryName);
        if (cat) {
            this.router.navigateByUrl('/search', {state: {category: cat, location: this.searchData.location}});
        }
    }

    public updateCity(data: SearchLocationDataInterface): void {
        if (data.city) {
            this.currentLocation.getCoords(data.country, data.city).pipe(
                filter(res => null !== res),
            ).subscribe(
                res => this.searchData.location = {
                    country: data.country,
                    city: data.city,
                    coordinates: res,
                },
            );
        } else if (data.coordinates?.latitude && data.coordinates?.longitude) {
            this.currentLocation.getExtendedLocationByCoords(data.coordinates).pipe(
                filter(res => null !== res),
            ).subscribe(
                res => this.searchData.location = {
                    country: res.country,
                    city: res.city,
                    coordinates: res.coords,
                },
            );
        }
    }


    public searchDisabled(): boolean {
        return !(this.searchData.needle && true);
    }

    public search(): void {
        this.router.navigateByUrl('/search', {state: {data: this.searchData}});
    }

    private initSearchData(): void {
        this.searchData = {
            needle: undefined,
            date: undefined,
            time: undefined,
            location: {
                coordinates: undefined,
                country: undefined,
                city: undefined,
            },
        };
    }

    private getCurrentLocation(): Observable<ExtendedLocation | null> {
        return this.currentLocation.getCurrentLocation();
    }
}
