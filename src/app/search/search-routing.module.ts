import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltersPage } from '@app/search/pages/filters/filters.page';
import { FiltersGuard } from './guards/filters.guard';
import { SearchPage } from './search-page.component';

const routes: Routes = [
    {
        path: '',
        component: SearchPage
    },
    {
        path: 'filters',
        component: FiltersPage,
        canActivate: [FiltersGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SearchPageRoutingModule {}
