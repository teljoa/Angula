import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiResponse, Anomaly, Location } from '../../interfaces';



@Injectable({
  providedIn: 'root'
})
export class BureauService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:4000';

  // --- ANOMALÍAS ---

  getAnomalies() {
    return this.http.get<ApiResponse<Anomaly[]>>(`${this.apiUrl}/anomalies`)
      .pipe(map(response => response.data));
  }

  deleteAnomaly(id: string) {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/anomalies/${id}`)
      .pipe(map(response => response.data));
  }

  // TODO: Implementar getAnomaly(id) para obtener detalles de una anomalía específica (para la edición
  getAnomaly(id: string){
    return this.http.get<ApiResponse<Anomaly>>(`${this.apiUrl}/anomalies/${id}`)
      .pipe(map(response=> response.data));
  }
  // TODO: Implementar createAnomaly(anomaly) para agregar una nueva anomalía al sistema. El parámetro "anomaly" debe ser un objeto con los campos necesarios para crear una anomalía (name, description, location, severity, etc.)
  createAnomaly(anomalia: Anomaly){
    return this.http.post<ApiResponse<Anomaly>>(`${this.apiUrl}/anomalies`, anomalia)
      .pipe(map(response=>response.data));
  }

  // TODO: Implementar updateAnomaly(id, anomaly) para actualizar los detalles de una anomalía existente. El parámetro "id" es el identificador de la anomalía a actualizar, y "anomaly" es un objeto con los campos que se desean modificar (name, description, location, severity, etc.)
  updateAnomaly(id: string, anomaly: any){
    return this.http.put<ApiResponse<Anomaly>>(`${this.apiUrl}/anomalies/${id}`, anomaly)
      .pipe(map(response=>response.data));
  }

  // --- UBICACIONES (Para el Dashboard) ---

  getLocations() {
    return this.http.get<ApiResponse<Location[]>>(`${this.apiUrl}/locations`)
      .pipe(map(response => response.data));
  }

  getEquipment() {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/equipment`)
      .pipe(map(res => res.data));
  }

  createEquipment(equipment: any) {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/equipment`, equipment)
      .pipe(map(res => res.data));
  }

  // TODO: Implementar getAgents() para obtener la lista de agentes disponibles en el sistema (para asignar equipamiento). El método debe retornar un observable con un array de objetos que representen a los agentes (con campos como _id, codeName, department, etc.)  
  getAgents(){
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/users`)
      .pipe(map(res=>res.data));
  }
}