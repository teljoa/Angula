import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paciente } from './interfaces/paciente';
import { PacienteCard } from "./paciente-card/paciente-card";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PacienteCard],
  templateUrl: './app.html',
  styleUrls:['./app.css']
  })

  export class App {
    pacientes: Paciente[] = [
      { id: 1, nombre: 'Marcus Fenix', infeccion: 15, estado: 'estable' },
      { id: 2, nombre: 'Sarah Connor', infeccion: 85, estado: 'critico' },
      { id: 3, nombre: 'Ellen Ripley', infeccion: 0, estado: 'estable' }
    ];

  administrarCura(p: Paciente) {
    if (p.infeccion > 0) p.infeccion -= 10;
    if (p.infeccion < 0) p.infeccion = 0;
    this.actualizarEstado(p);
  }

  darDeBaja(id: number) {
    this.pacientes = this.pacientes.filter(p => p.id !== id);
  }
  
  private actualizarEstado(p: Paciente) {
    if (p.infeccion > 70) p.estado = 'critico';
    else p.estado = 'estable';
    }
  }