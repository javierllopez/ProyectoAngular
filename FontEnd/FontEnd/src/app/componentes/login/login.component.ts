import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(public dialogRef: MatDialog) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.closeAll();
  }

  onLogin(): void {
    // Aquí puedes agregar la lógica para autenticar al usuario
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
    this.dialogRef.closeAll();
  }
}
