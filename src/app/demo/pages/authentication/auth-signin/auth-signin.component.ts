import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export default class AuthSigninComponent {
  email = '';
  password = '';
  rememberMe: boolean = false;
  loginStatus: string = ''; // Variable para el mensaje de retroalimentación


  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.loginStatus = 'Iniciando sesión...'; // Mensaje mientras se procesa el login
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error('Error en el login', err);
        this.loginStatus = 'No fue posible iniciar sesión. Verifique sus credenciales.';
      },
    });
  }

}
