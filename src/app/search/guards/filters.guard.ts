import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchFilterStateService } from '../services/search-filter-state.service';

@Injectable()
export class FiltersGuard implements CanActivate {
    constructor(private readonly state: SearchFilterStateService, private readonly router: Router) {}

    public canActivate(): boolean | UrlTree {
        if (!this.state.isSearchPageInit) {
            return this.router.parseUrl('/search');
        }

        return true;
    }
}
