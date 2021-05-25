import { Component, OnInit } from '@angular/core';
import { ExtendedLocation } from '@app/core/models/extended-location';
import { CurrentLocationCompilerService } from '@app/core/services/location/current-location-compiler.service';
import { DefaultCategoryList } from '@app/main/enums/default-category-list';
import { MainPageSearchInterface } from '@app/main/interfaces/main-page-search-interface';
import { SearchLocationDataInterface } from '@app/main/interfaces/search-location-data-interface';
import { DefaultCategoriesFactoryService } from '@app/main/services/default-categories-factory.service';
import { SearchFilterStateService } from '@app/search/services/search-filter-state.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  public searchData: MainPageSearchInterface;
  public locationEnabled = false;
  public defaultCategoryList = DefaultCategoryList;

  public get formFields() {
    return this.stateManager.formFields;
  }
  public get formGroups() {
    return this.stateManager.formGroups;
  }
  public get form() {
    return this.stateManager.searchForm;
  }

  constructor(
    private readonly currentLocation: CurrentLocationCompilerService,
    private readonly defaultCategory: DefaultCategoriesFactoryService,
    public readonly stateManager: SearchFilterStateService,
  ) {}

  public ngOnInit(): void {
    this.getCurrentLocation().subscribe(
      data => {
        if (data) {
          this.form.get(this.formGroups.location).setValue({
            country: data.country,
            city: data.city,
            coordinates: data.coords,
          });
        }
      },
      err => {
        this.locationEnabled = true;
      },
      () => {
        this.locationEnabled = true;
      },
    );
  }

  public useCategory(categoryName: string): void {
    const cat = this.defaultCategory.getByName(categoryName);
    if (cat) {
      this.form.get(this.formFields.category).setValue(cat);
    }
    this.search();
  }

  public updateCity(data: SearchLocationDataInterface): void {
    if (data.city) {
      this.currentLocation
        .getCoords(data.country, data.city)
        .pipe(filter(res => null !== res))
        .subscribe(res => {
          this.form.get(this.formGroups.location).setValue({
            country: data.country,
            city: data.city,
            coordinates: res,
          });
        });
    } else if (data.coordinates?.latitude && data.coordinates?.longitude) {
      this.currentLocation
        .getExtendedLocationByCoords(data.coordinates)
        .pipe(filter(res => null !== res))
        .subscribe(res => {
          this.form.get(this.formGroups.location).setValue({
            country: res.country,
            city: res.city,
            coordinates: res.coords,
          });
        });
    }
  }

  public searchDisabled(): boolean {
    return !this.form.get(this.formFields.query).value;
  }

  public search(): void {
    this.stateManager.doSearch();
  }

  private getCurrentLocation(): Observable<ExtendedLocation | null> {
    return this.currentLocation.getCurrentLocation();
  }
}
