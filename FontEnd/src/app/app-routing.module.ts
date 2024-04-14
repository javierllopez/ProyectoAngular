import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component'; // Importa el LoginComponent

const routes: Routes = [{ path: '', redirectTo: '/home', pathMatch: 'full' },
// Otras rutas de tu aplicación
{ path: 'login', component: LoginComponent }, // Agrega esta línea para la ruta "/login"
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
