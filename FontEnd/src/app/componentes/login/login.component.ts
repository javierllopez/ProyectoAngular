import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService) {
    const username: String = ""

  }

}
