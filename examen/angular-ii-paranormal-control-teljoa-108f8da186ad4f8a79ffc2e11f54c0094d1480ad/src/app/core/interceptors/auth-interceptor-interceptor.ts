import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 
  // TODO: Implementar lógica para agregar el token de autenticación a las solicitudes HTTP
  const token=inject(AuthService).getToken();

  if(token){
    req=req.clone({setHeaders:{
      Authorization:`Bearer ${token}`
    }});
  }

  return next(req);
};