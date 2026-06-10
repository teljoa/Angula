import { Routes } from '@angular/router';
import { Home } from './components/layout/home/home';



export const routes: Routes = [
    {path:"", component:Home},
    {path:"tasks", children:[
        {path: ""}
    ]}
];
