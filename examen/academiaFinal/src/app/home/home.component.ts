import { Component, inject, OnInit } from '@angular/core';
import { ProfesorService } from '../services/profesor.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Profesor } from '../interfaces/profesor';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{

  profesorService=inject(ProfesorService);
  route:Router=inject(Router)


  ngOnInit(): void {
    
    this.profesorService.fetchProfesores();

  }


  elegirProfesor(p:Profesor){
    this.profesorService.setProfesor(p);
    this.route.navigateByUrl('/alumnos/nuevo');
  }


}
