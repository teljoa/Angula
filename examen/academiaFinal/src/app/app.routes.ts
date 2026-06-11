import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormAlumnoComponent } from './form-alumno/form-alumno.component';
import { profesorGuard } from './guards/profesor.guard';

export const routes: Routes = [

    {path:'',component:HomeComponent},
    {path:'alumnos/nuevo',component:FormAlumnoComponent,canActivate:[profesorGuard]},
    {path:'cursos',loadChildren:()=>import('./cursos/curso.routes').then(m=>m.routes),canActivate:[profesorGuard]},
    {path:'cursos/nuevo', canActivate:[profesorGuard], loadComponent:()=>import('./cursos/form-cursos/form-cursos.component').then(m=>m.FormCursosComponent)}

];
