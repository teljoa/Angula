import { Component } from '@angular/core';

@Component({
  selector: 'app-anomaly-form',
  standalone: true,
  imports: [],
  templateUrl: './anomaly-form.html'
})
export class AnomalyFormComponent {
  // TODO: Formulario reactivo para crear/editar anomalías, con validaciones personalizadas
  // El formulario tendrá campos como:
  // - Subject (requerido y con validador de formato OBJ-XXXX)
  // - Description (requerido, mínimo 500 caracteres)
  // - Danger Level (opciones: Safe (Seguro), Euclid (Impredecible), Keter (Peligroso))
  // - Discovery Date 
  // - Containment Date (debe ser posterior a Discovery Date)
  // - Severity (opciones: Low, Medium, High)
  // - Status (opciones: Contained (Contenido), Breached(Fugado), Unknown (Desconocido))
}