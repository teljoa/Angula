// src/app/interfaces/api-response.interface.ts
export interface ApiResponse<T> {
  status: string;
  timestamp: string;
  data: T;
}


// src/app/interfaces/anomaly.interface.ts
export interface Anomaly {
  _id: string;
  subject: string;
  description: string;
  dangerLevel: 'Safe' | 'Euclid' | 'Keter';
  status: 'Contained' | 'Breached' | 'Unknown';
  registeredBy: string;
  discoveryDate: string;
  containmentDate: string;
}

export interface Equipment {
  _id?: string;
  name: string;
  type: string;
  condition: 'New' | 'Used' | 'Damaged';
  // Puede ser el ID (string) o el Objeto Agente (si viene poblado de la API)
  assignedTo?: string | { _id: string, codeName: string, department: string } | null;
}
// Definimos interfaz rápida para Locations aquí o en interfaces/index.ts
export interface Location {
  _id: string;
  name: string;
  coordinates: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface Agent {
  _id: String;
  email: String;
  password: String; 
  codeName: String;
  department: String;
  clearanceLevel: Number;
}