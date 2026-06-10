import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BureauService } from '../../../core/services/bureau-service';

@Component({
  selector: 'app-equipment-list',
  imports: [RouterLink],
  templateUrl: './equipment-list.html',

})
export class EquipmentList {
  private bureauService = inject(BureauService);

  list = signal<any[]>([]);

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.bureauService.getEquipment().subscribe({
      next: (data) => {
        console.log('Inventario cargado:', data);
        this.list.set(data);
      },
      error: (err) => console.error('Error cargando inventario:', err)
    });
  }

  // Helper para el template (Type Guard simple)
  isAgent(obj: any): obj is { codeName: string, department: string } {
    return obj && typeof obj === 'object' && 'codeName' in obj;
  }
}
