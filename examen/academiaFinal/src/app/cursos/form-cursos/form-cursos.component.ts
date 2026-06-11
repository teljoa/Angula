import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { ProfesorService } from '../../services/profesor.service';
import { CursoService } from '../../services/curso.service';
import { Router, RouterLink } from '@angular/router';
import { Alumno } from '../../interfaces/alumno';
import { CommonModule } from '@angular/common';
import { FechaPosterior} from '../validator/fecha-posterior.service';
import { Curso } from '../../interfaces/curso';

@Component({
  selector: 'app-form-cursos',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './form-cursos.component.html'
})
export class FormCursosComponent implements OnInit{

  fb=inject(FormBuilder)
  alumnoService=inject(AlumnoService)
  profesorService=inject(ProfesorService)
  cursoService=inject(CursoService)
  route:Router=inject(Router)

  alumnos:Alumno[]=[]

  modo:string='add';

  profesorLogin=this.profesorService.profesor$;

  @Input()id?:string;

  public myForm:FormGroup = this.fb.group({
  nombre: ['', [Validators.required]],
  fechaInicio: ['', [Validators.required,FechaPosterior]],
  costo: ['', [Validators.required, Validators.min(0)]],
  alumnoId: ['', [Validators.required]]
  })


  ngOnInit(): void {

    this.alumnoService.fetchAlumnos();

    this.alumnoService.alumnos.subscribe({
        next:list=>{
        this.alumnos=list
        }
    })


    
    if(this.id!=undefined){
      this.modo='edit'

      this.cursoService.fetchCursosById(this.id).subscribe({
        next:curso=>{
          this.myForm.patchValue(curso)
          this.myForm.get('alumnoId')?.disable()
        }
      })
    }

  }


  guardar(){

    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return
    }

       const payload: Curso = {...this.myForm.getRawValue(),
        id: this.id,
        profesorId: this.profesorLogin()?.id
      };

    if(this.modo==='add'){
      this.cursoService.addCurso(payload).subscribe({
        next:()=>{
          console.log("Curso añadido correctamente")
          this.route.navigateByUrl('/cursos')
        }
      })


    }else{
        this.cursoService.editCurso(payload).subscribe({
        next:()=>{
          console.log("Curso editado correctamente")
          this.route.navigateByUrl('/cursos')
        }
      })

    }




  }


}
