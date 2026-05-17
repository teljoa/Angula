import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paciente-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-card.html',
  styleUrl: './paciente-card.css',
})
export class PacienteCard {

    @Input() pacienteInfo!: any;

    @Output() curarClick= new EventEmitter<void>();
    @Output() bajaClick= new EventEmitter<number>();

    getColor(): string{
      return this.pacienteInfo.infeccion >50 ? 'red' : 'lime';
    }
}
