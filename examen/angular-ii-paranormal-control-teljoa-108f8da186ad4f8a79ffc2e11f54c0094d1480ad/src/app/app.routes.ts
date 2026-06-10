// app.routes.ts
import { Routes, CanActivateFn } from '@angular/router';
import { authGuard } from './core/guards/auth-guard-guard';
import { Anomalies } from './features/anomalies/anomaliy-list/anomalies';
import { Login } from './features/auth/login/login';

export const routes: Routes = [
  // TODO: Cargar rutas de autenticación (login, register) sin protección de guardia
  // La ruta de login se cargará siempre, la de register solo si el usuario navega a ella (lazy loading)
  {path:"login", component:Login},
  {path:"register", loadComponent:()=>import('./features/auth/register/register').then(m=>m.Register)},
  // El resto de rutas estarán protegidas por el authGuard, que redirigirá a login si no hay usuario autenticado
  // Todas las rutas relacionadas con anomalías se cargarán de forma perezosa (lazy loading) para optimizar la carga inicial de la aplicación
  // Las rutas de dashboard y equipamiento como se quiera:
  // dashboard
  {path:"dashboard", loadComponent:()=>import('./features/dashboard/dashboard.component').then(m=>m.DashboardComponent), canActivate:[authGuard]},
  // anomalies - list
  {path:"anomalies", canActivate:[authGuard], children:[
    {path:"", loadComponent:()=>import('./features/anomalies/anomaliy-list/anomalies').then(m=>m.Anomalies)},
  
  // anomalies/create - form para crear nueva anomalía
    {path:"create", loadComponent:()=>import('./features/anomalies/anomaly-form/anomaly-form').then(m=>m.AnomalyFormComponent)},
  // anomalies/edit/:id - form para editar anomalía existente
    {path:"edit/:id", loadComponent:()=>import('./features/anomalies/anomaly-form/anomaly-form').then(m=>m.AnomalyFormComponent)}
  ]},
  // equipment - listado de equipamiento
  {path:"equipment",canActivate:[authGuard], children:[
    {path: "" , loadComponent:()=>import('./features/equipment/equipment-list/equipment-list').then(m=>m.EquipmentList)},
    
  // equipment/add - form para agregar nuevo equipamiento
    {path:"add", loadComponent:()=>import('./features/equipment/equipment-form/equipment-form').then(m=>m.EquipmentForm)},
  ]},
  // Si no se encuentra la ruta, redirigir a login
  {path:"**", redirectTo:'login'}
];