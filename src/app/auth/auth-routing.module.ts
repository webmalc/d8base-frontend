import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'login',
        loadChildren: './pages/login/login.module#LoginPageModule'
    },
    {
        path: 'registration',
        loadChildren: './pages/registration/registration.module#RegistrationPageModule'
    },
    {
        path: 'password-recover',
        loadChildren: './pages/password-recover/password-recover.module#PasswordRecoverPageModule'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AuthRoutingModule {}
