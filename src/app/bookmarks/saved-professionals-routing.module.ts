import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksListPageComponent } from './bookmarks-list-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BookmarksListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedProfessionalsRoutingModule {}
