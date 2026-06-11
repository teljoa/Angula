import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Curso } from '../interfaces/curso';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private url: string = 'http://localhost:3000/cursos';

  private readonly cursos$: BehaviorSubject<Curso[]> = new BehaviorSubject<Curso[]>([]);

  constructor() {}

  httpClient: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  fetchCursos() {
    this.httpClient.get<Curso[]>(this.url)
      .subscribe(cursos => this.cursos$.next(cursos));
  }

  fetchCursosByIdProfesor(id:string | undefined) {
    this.httpClient.get<Curso[]>(`${this.url}?profesorId=${id}`)
      .subscribe(cursos => this.cursos$.next(cursos));
  }

  fetchCursosById(id:string | undefined) {
    return this.httpClient.get<Curso>(`${this.url}/${id}`)
  }

  get cursos(): Observable<Curso[]> {
    return this.cursos$.asObservable();
  }


  deleteCurso(c:Curso) {
    return this.httpClient.delete(`${this.url}/${c.id}`).pipe(
      tap(
        ()=>{
          const actuales=this.cursos$.value;

          const actualizados=actuales.filter(curso=>curso.id!==c.id)

          this.cursos$.next(actualizados)
        }
      )
    )
  }

    addCurso(c:Curso) {
    return this.httpClient.post<Curso>(`${this.url}`,c).pipe(
      tap(
        ()=>{
          const actuales=this.cursos$.value;


          this.cursos$.next([...actuales,c])
        }
      )
    )
  }


    editCurso(c:Curso) {
    return this.httpClient.put<Curso>(`${this.url}/${c.id}`,c).pipe(
      tap(
        newC=>{
          const actuales=this.cursos$.value;

          const actualizados=actuales.map(curso=>curso.id===c.id ? newC:curso)

          this.cursos$.next(actualizados)
        }
      )
    )
  }
  
}
