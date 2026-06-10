import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class Navbar {
  authService = inject(AuthService); // Público para usar en HTML

  private route=inject(Router);

  get isLogged(){
    return this.authService.isAuthentication();
  }

  get user(){
    return this.authService.currentUser;
    
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['/login']);
  }
}