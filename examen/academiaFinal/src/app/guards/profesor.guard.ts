import { CanActivateFn, Router } from '@angular/router';
import { ProfesorService } from '../services/profesor.service';
import { inject } from '@angular/core';

export const profesorGuard: CanActivateFn = (route, state) => {

  const profesorService=inject(ProfesorService);
  const router:Router=inject(Router)


  if(profesorService.profesor$()!==null){
    return true;
  }else{
    router.navigateByUrl('/')
    return false;
  }
};
