import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('src/app/auth/pages/login/login.module').then( m => m.LoginPageModule)
    },
    {
        path: 'registration',
        loadChildren: () => import('src/app/auth/pages/registration/registration.module').then( m => m.RegistrationPageModule)
    },
    {
        path: 'password-recover',
        loadChildren: () => import('src/app/auth/pages/password-recover/password-recover.module').then( m => m.PasswordRecoverPageModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AuthRoutingModule {}
