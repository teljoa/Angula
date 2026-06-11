import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProfesorService } from '../services/profesor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent{

  profesorService=inject(ProfesorService);
  route:Router=inject(Router)

  profesorLogin=this.profesorService.profesor$;


  cambiarProfesor(){
    this.profesorService.cleanLS();
    this.route.navigateByUrl('/');
  }


}
