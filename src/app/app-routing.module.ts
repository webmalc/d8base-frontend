import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {MainGuard} from '@app/core/guards/main.guard';

const routes: Routes = [
    {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
    {
        path: 'auth',
        loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'profile',
        loadChildren: () => import('src/app/profile/profile.module').then(m => m.ProfilePageModule),
        canActivate: [MainGuard]
    },
    {
        path: 'professional',
        loadChildren: () => import('./master/master.module').then(m => m.MasterPageModule)
    },
    {
        path: 'service',
        loadChildren: () => import('./service/service.module').then(m => m.ServicePageModule)
    },
    {
        path: 'message',
        loadChildren: () => import('./message/message.module').then(m => m.MessagePageModule),
        canActivate: [MainGuard]
    },
    {
        path: 'search',
        loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
            initialNavigation: 'enabled',
            paramsInheritanceStrategy: 'always'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
