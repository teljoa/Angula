import { Component, inject } from '@angular/core';
import { FormBuilder,ReactiveFormsModule,Validators,AbstractControl,AsyncValidatorFn } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html'
})
export class Register {
  // TODO: Formulario de registro para nuevos agentes. 
  // Campos: 
  // email (required y tipo email), 
  // password (required, longitud mínima 4), 
  // codeName (con validador asíncrono), 
  // department (select con opciones: Investigación, Contención, Seguridad). 
  // Al enviar, hacer POST a http://localhost:4000/auth/register. Mostrar alertas según respuesta del servidor.
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMsg = '';

  form = this.fb.group({

    email: ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(4)]],
    codeName: ['',[Validators.required],[this.odeNameValidator()]],
    department: ['Investigación',Validators.required]
  });

  onSubmit(){

    if(this.form.invalid){
      return;
    }

    this.authService
      .register(this.form.getRawValue()).subscribe({
        next:()=>{
          alert('Agente registrado correctamente');
          this.router.navigate(['/login']);
        },

        error:()=>{
          this.errorMsg ='Error al registrar agente';
        }

      }
    );
  }

  odeNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return timer(500).pipe(
        switchMap(()=>{
          const value =control.value;

          if(value?.toLowerCase() ==='director faden'){
            return of({codeNameExists:true});
          }
          return of(null);
        })
      );
    };
  }
}