import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MustBeAuthorizedGuard } from '@app/core/services/guards/must-be-authorized.guard';
import { NavPath } from './core/constants/navigation.constants';
import { NotFoundPageComponent } from './shared/components';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule),
    pathMatch: 'full',
  },
  {
    path: NavPath.Auth,
    loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: NavPath.Profile,
    loadChildren: () => import('src/app/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [MustBeAuthorizedGuard],
  },
  {
    path: NavPath.Professional,
    loadChildren: () => import('./professional/professional.module').then(m => m.ProfessionalModule),
  },
  {
    path: NavPath.Service,
    loadChildren: () => import('./service/service.module').then(m => m.ServicePageModule),
  },
  {
    path: NavPath.Message,
    loadChildren: () => import('./message/message.module').then(m => m.MessagePageModule),
    canActivate: [MustBeAuthorizedGuard],
  },
  {
    path: NavPath.Search,
    loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule),
  },
  {
    path: NavPath.Order,
    loadChildren: () => import('./booking/order.module').then(m => m.OrderPageModule),
  },
  {
    path: NavPath.Orders,
    loadChildren: () => import('./orders/my-orders.module').then(m => m.MyOrdersModule),
  },
  {
    path: NavPath.Reviews,
    loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsModule),
  },
  {
    path: NavPath.Bookmarks,
    loadChildren: () => import('./bookmarks/bookmarks.module').then(m => m.BookmarksModule),
    canActivate: [MustBeAuthorizedGuard],
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
