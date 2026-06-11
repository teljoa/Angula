import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profesor } from '../interfaces/profesor';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const ls_key="profesorActual"

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {


private url: string = 'http://localhost:3000/profesores';

private readonly profesores$: BehaviorSubject<Profesor[]> = new BehaviorSubject<Profesor[]>([]);

constructor() {}

httpClient: HttpClient = inject(HttpClient);
router: Router = inject(Router);

fetchProfesores() {
  this.httpClient.get<Profesor[]>(this.url)
    .subscribe(profesores => this.profesores$.next(profesores));
}

get profesores(): Observable<Profesor[]> {
  return this.profesores$.asObservable();
}



//////////////////////////////////////////////////////// LOCAL STORAGE


private _profesor=signal<Profesor | null>(this.leerLS());


profesor$=this._profesor.asReadonly();


setProfesor(p:Profesor){
  this._profesor.set(p);
  localStorage.setItem(ls_key,JSON.stringify(p))
}


cleanLS(){
  this._profesor.set(null);
  localStorage.removeItem(ls_key)
}


leerLS(){
  const raw=localStorage.getItem(ls_key);

  return raw!==null ? JSON.parse(raw) as Profesor :null;

}


}
