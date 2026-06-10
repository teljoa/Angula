import { Component, inject, signal } from '@angular/core';
import { BureauService } from '../../core/services/bureau-service';
import { AuthService } from '../../core/services/auth-service';
import { Location } from '../../interfaces';

@Component({
  selector: 'app-dashboard-component',
  imports: [],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private bureauService = inject(BureauService);
  public authService = inject(AuthService); // Para saludar al usuario

  // Usamos signals para los datos
  locations = signal<Location[]>([]);

  constructor() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.bureauService.getLocations().subscribe({
      next: (data) => this.locations.set(data),
      error: (err) => console.error('Error cargando red de vigilancia', err)
    });
  }
}
