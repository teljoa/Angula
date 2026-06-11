import { Routes } from "@angular/router";
import { CursosComponent } from "./cursos.component";
import { FormCursosComponent } from "./form-cursos/form-cursos.component";

export const routes: Routes = [

    {path:'',component:CursosComponent},
    {path:'editar/:id',component:FormCursosComponent},
    {path:'nuevo',component:FormCursosComponent},


];