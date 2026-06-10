import { Component, inject } from '@angular/core';
import { BureauService } from '../../../core/services/bureau-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-equipment-form',
  imports: [FormsModule],
  templateUrl: './equipment-form.html',
})
export class EquipmentForm {
  // TODO: Formulario template para agregar nuevo equipamiento al inventario. Campos:
  // - Name (requerido)
  // - Type (requerido, opciones: Armamento, Protección, Utilidad)
  // - Condition (opciones: New, Used, Broken)
  // - Assigned To (select con agentes disponibles, opcional)
  
  private bureauService = inject(BureauService);
  private router = inject(Router);

  agents:any[] = [];

  equipment = {name: '', type: '', condition: 'New', assignedTo: null};

  ngOnInit(){
    this.bureauService.getAgents().subscribe({
      next:(agents)=>{this.agents = agents;}
    });
  }

  onSubmit(){
    this.bureauService.createEquipment(this.equipment).subscribe({
      next:()=>{
        alert('Equipamiento registrado');
        this.router.navigate(['/equipment']);
      },
      error:(err)=>{
        console.error(err);
      }
    });
  }
}