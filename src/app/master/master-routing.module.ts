import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditMasterComponent} from '@app/master/components/edit-master/edit-master.component';
import {MasterPage} from './master.page';

const routes: Routes = [
    {
        path: '',
        component: MasterPage,
    },
    {
        path: 'add',
        component: EditMasterComponent
    },
    {
        path: 'edit/:id',
        loadChildren: () => import('./pages/master-tabs/master-tabs.module').then(m => m.MasterTabsPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MasterPageRoutingModule {
}
