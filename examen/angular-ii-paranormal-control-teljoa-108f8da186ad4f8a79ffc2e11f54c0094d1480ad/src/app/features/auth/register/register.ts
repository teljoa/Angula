import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
})
export class Register {
  // TODO: Formulario de registro para nuevos agentes. 
  // Campos: 
  // email (required y tipo email), 
  // password (required, longitud mínima 4), 
  // codeName (con validador asíncrono), 
  // department (select con opciones: Investigación, Contención, Seguridad). 
  // Al enviar, hacer POST a http://localhost:4000/auth/register. Mostrar alertas según respuesta del servidor.



}
