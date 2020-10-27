import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FiltersPage} from '@app/issuance/pages/filters/filters.page';
import {IssuancePage} from './issuance.page';

const routes: Routes = [
    {
        path: '',
        component: IssuancePage
    },
    {
        path: 'filters',
        component: FiltersPage
        // loadChildren: () => import('./pages/filters/filters.module').then(m => m.FiltersPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IssuancePageRoutingModule {
}
