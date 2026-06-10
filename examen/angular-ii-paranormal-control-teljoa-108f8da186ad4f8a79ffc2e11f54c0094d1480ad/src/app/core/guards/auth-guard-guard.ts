import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  // TODO: Implementar lógica para verificar si el usuario está autenticado
  // - Si el usuario no está autenticado, redirigir a la página de login
  // - Si el usuario está autenticado, permitir acceso a la ruta solicitada
  const auth=inject(AuthService);

  const router=inject(Router);

  if(auth.isAuthentication()){
    return true;
  }

  return router.createUrlTree(
    ['/login']
  );

  //return false;
};