import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainGuard } from '@app/core/guards/main.guard';
import { ServiceWizardPath } from './service-wizard/const/service-wizard-path.const';
import { NotFoundPageComponent } from './shared/components';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule),
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('src/app/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [MainGuard],
  },
  {
    path: 'professional',
    loadChildren: () => import('./master/master.module').then(m => m.MasterPageModule),
  },
  {
    path: 'service',
    loadChildren: () => import('./service/service.module').then(m => m.ServicePageModule),
  },
  {
    path: ServiceWizardPath,
    loadChildren: () => import('./service-wizard/service-wizard.module').then(m => m.ServiceWizardModule),
  },
  {
    path: 'message',
    loadChildren: () => import('./message/message.module').then(m => m.MessagePageModule),
    canActivate: [MainGuard],
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule),
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderPageModule),
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./my-orders/my-orders.module').then(m => m.MyOrdersModule),
  },
  {
    path: 'reviews',
    loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsModule),
  },
  {
    path: 'saved-professionals',
    loadChildren: () =>
      import('./saved-professionals/saved-professionals.module').then(m => m.SavedProfessionalsModule),
    canActivate: [MainGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
      paramsInheritanceStrategy: 'always',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
