import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMsg = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    // TODO: Implementar lógica de autenticación utilizando AuthService. Mostrar mensaje de error si las credenciales son inválidas.
    // Para el error, mostrar el mensaje "CREDENCIALES INVÁLIDAS O ACCESO DENEGADO" y limpiar el campo de contraseña.
    // Si el login es exitoso, redirigir al usuario al dashboard (ruta: /dashboard)
    if(this.form.invalid){
      return
    }

    const {email, password}=this.form.getRawValue();

    this.authService.login(
      email!,
      password!
    )
    .subscribe({
      next:(response:any)=>{
        this.router.navigate(['/dashboard']);
      },
      error:()=>{
        this.errorMsg="CREDENCIALES INVÁLIDAS O ACCESO DENEGADO";

        this.form.patchValue({password:''})
      }
    })
    
  }

}
