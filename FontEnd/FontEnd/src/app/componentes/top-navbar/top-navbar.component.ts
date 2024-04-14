import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent {
  title = 'El Creador';

  constructor(private router: Router) {}

  login() {
    // Implementa aquí tu lógica de inicio de sesión
    this.router.navigate(['login']);
    console.log('Iniciar sesión');

  }
}
