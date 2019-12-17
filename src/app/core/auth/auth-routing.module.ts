import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: 'login',
        loadChildren: './components/pages/login/login.module#LoginPageModule'
    },
    {
        path: 'registration',
        loadChildren: './components/pages/registration/registration.module#RegistrationPageModule'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AuthRoutingModule {}
