import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private route:Router){

  }
  // auth guard to ensure the token has not expired and is a valid session, otherwise login again
  canActivate(): boolean {
    if(this.authService.isLoggedIn()){
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
      }

  }
