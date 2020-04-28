import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterPage } from './master.page';

const routes: Routes = [
    {
        path: '',
        component: MasterPage,
    },
    {
        path: 'edit',
        loadChildren: () => import('src/app/master/pages/edit-master/edit-master.module').then( m => m.EditMasterPageModule),
    },
    {
        path: 'edit/:id',
        loadChildren: () => import('src/app/master/pages/edit-master/edit-master.module').then( m => m.EditMasterPageModule),
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MasterPageRoutingModule {}
