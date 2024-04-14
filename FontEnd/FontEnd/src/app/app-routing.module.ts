import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/componentes/login/login.component';

const routes: Routes = [  { path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: 'login', component: LoginComponent },
// Otras rutas de tu aplicación;
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
