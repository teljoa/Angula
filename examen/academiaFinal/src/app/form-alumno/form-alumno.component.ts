import { Component, inject, OnInit } from '@angular/core';
import { AlumnoService } from '../services/alumno.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Alumno } from '../interfaces/alumno';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-form-alumno',
  imports: [FormsModule,CommonModule],
  templateUrl: './form-alumno.component.html'
})
export class FormAlumnoComponent {

  alumnoService=inject(AlumnoService)
  route:Router=inject(Router)


  newAlumno:Alumno={
    nombre:'',
    edad:0,
    dni:'',
    email:''
  }



  guardar(myForm:NgForm){

    if(myForm.invalid){
      return;
    }

    this.alumnoService.addAlumnos(this.newAlumno).subscribe({
      next:()=>{
        console.log("Alumno añadido con exito")
      },
      error:(err)=> {
        console.log("Error al añadido alumno",err)
      },
    })

    myForm.reset();

  }


}
