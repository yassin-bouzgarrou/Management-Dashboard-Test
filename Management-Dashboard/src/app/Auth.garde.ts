// i implement  authGarde allows access to the home page only when the user is logged in,
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './Auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // If not authenticated, navigate to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
