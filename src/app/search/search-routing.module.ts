import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiltersPageComponent } from '@app/search/pages/filters-page/filters-page.component';
import { SearchPage } from './pages/search/search-page.component';
import { SearchPageGuard } from './search-page.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SearchPage,
    canActivate: [SearchPageGuard],
  },
  {
    path: 'filters',
    component: FiltersPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {}
