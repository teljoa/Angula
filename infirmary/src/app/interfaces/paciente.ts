export interface Paciente {
    id: number,
    nombre: string,
    infeccion: number, // Porcentaje de infección (0-100)
    estado: 'estable' | 'critico' | 'transformado'
}
