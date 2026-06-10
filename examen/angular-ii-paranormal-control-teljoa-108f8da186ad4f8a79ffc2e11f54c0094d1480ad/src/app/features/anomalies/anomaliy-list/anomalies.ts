import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BureauService } from '../../../core/services/bureau-service';
import { AuthService } from '../../../core/services/auth-service';
import { Anomaly } from '../../../interfaces';

@Component({
  selector: 'app-anomalies',
  imports: [RouterLink],
  templateUrl: './anomalies.html',
})
export class Anomalies {
  private bureauService = inject(BureauService);
  public authService = inject(AuthService); // Público para usar en template

  anomalies = signal<Anomaly[]>([]);

  constructor() {
    this.loadAnomalies();
  }

  loadAnomalies() {
    this.bureauService.getAnomalies().subscribe({
      next: (data) => this.anomalies.set(data),
      error: (err) => console.error('Error recuperando expedientes X', err)
    });
  }

  deleteAnomaly(id: string) {
    if(!confirm('¿CONFIRMA LA ELIMINACIÓN DEL EXPEDIENTE? Esta acción es irreversible.')) return;

    this.bureauService.deleteAnomaly(id).subscribe({
      next: () => {
        // Actualizamos la lista localmente filtrando el eliminado
        this.anomalies.update(list => list.filter(a => a._id !== id));
      },
      error: (err) => alert('ERROR: Permisos insuficientes o fallo de red.')
    });
  }
}
