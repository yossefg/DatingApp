import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSerivce: AuthService , private router: Router , private alertify: AlertifyService ) {}
  canActivate():  boolean {
      if (this.authSerivce.loggedIn()) {
        return true;
      }
      this.alertify.error('you should not pass!!');
      this.router.navigate(['home']);
      return false;
  }
}
