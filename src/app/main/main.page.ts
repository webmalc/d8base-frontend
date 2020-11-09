import {Component, OnInit} from '@angular/core';
import {LocationService} from '@app/core/services/location/location.service';
import {PhotoSanitizerService} from '@app/core/services/photo-sanitizer.service';
import {MainPageSearchInterface} from '@app/main/interfaces/main-page-search-interface';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss']
})
export class MainPage implements OnInit {

    public searchData: MainPageSearchInterface;

    constructor(
        public readonly sanitizer: PhotoSanitizerService,
        private readonly location: LocationService
    ) {
    }

    public ngOnInit(): void {
        this.initSearchData();
    }

    public search(): void {
        this.checkLocation().then(
            _ => console.log(this.searchData)
        );
    }

    private checkLocation(): Promise<void> {
        if (
            this.searchData.location.city
            || this.searchData.location.country
            || this.searchData.location.coordinates.coordinates.length === 2
        ) {
            return Promise.resolve();
        }

        return new Promise<void>(resolve => this.location.getMergedLocationData().then(
            data => {
                this.searchData.location.coordinates.coordinates = data.coordinates.coordinates;
                resolve();
            }
        ));
    }

    private initSearchData(): void {
        this.searchData = {
            needle: undefined,
            date: undefined,
            time: undefined,
            location: {
                coordinates: {
                    coordinates: [],
                    type: undefined
                },
                country: undefined,
                city: undefined
            }
        };
    }
}
