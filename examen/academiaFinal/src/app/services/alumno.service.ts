import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Alumno } from '../interfaces/alumno';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

private url: string = 'http://localhost:3000/alumnos';

private readonly alumnos$: BehaviorSubject<Alumno[]> = new BehaviorSubject<Alumno[]>([]);

constructor() {}

httpClient: HttpClient = inject(HttpClient);
router: Router = inject(Router);

fetchAlumnos() {
  this.httpClient.get<Alumno[]>(this.url)
    .subscribe(alumnos => this.alumnos$.next(alumnos));
}

fetchAlumnosById(id:string | undefined) {
    return this.httpClient.get<Alumno>(`${this.url}/${id}`)
  }

get alumnos(): Observable<Alumno[]> {
  return this.alumnos$.asObservable();
}


addAlumnos(a:Alumno) {
  return this.httpClient.post<Alumno>(this.url,a).pipe(
    tap(
      alum=>{
        
        const actuales=this.alumnos$.value;

        this.alumnos$.next([...actuales,alum])

      }
  ))

}


}
