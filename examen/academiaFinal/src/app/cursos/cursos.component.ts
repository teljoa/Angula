import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProfesorService } from '../services/profesor.service';
import { AlumnoService } from '../services/alumno.service';
import { CursoService } from '../services/curso.service';
import { CommonModule } from '@angular/common';
import { Alumno } from '../interfaces/alumno';
import { Curso } from '../interfaces/curso';

@Component({
  selector: 'app-cursos',
  imports: [RouterLink,CommonModule],
  templateUrl: './cursos.component.html'
})
export class CursosComponent implements OnInit{

  alumnoService=inject(AlumnoService)
  profesorService=inject(ProfesorService)
  cursoService=inject(CursoService)
  route:Router=inject(Router)

  alumnos:Alumno[]=[]

  profesorLogin=this.profesorService.profesor$;


  ngOnInit(): void {
    this.cursoService.fetchCursosByIdProfesor(this.profesorLogin()?.id);
    this.alumnoService.fetchAlumnos();

    this.alumnoService.alumnos.subscribe({
      next:a=>{
        this.alumnos=a;
      }
    })

  }


  borrarCurso(c:Curso){

    this.cursoService.deleteCurso(c).subscribe({
      next:()=>{
        console.log("Curso borrado correctamente")
      }
    })

  }


  nombreAlumno(id:string){

    const alum=this.alumnos.find(a=> a.id===id);

    return alum?.nombre || 'No se ha econtrado el alumnos';

  }

}
