import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {MainGuard} from '@app/core/guards/main.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('src/app/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [MainGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
