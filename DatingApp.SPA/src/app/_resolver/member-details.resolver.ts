import {Injectable} from '@angular/core';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../model/User';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private _userSerivce: UserService , private router: Router, private alertify: AlertifyService) {
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
       return this._userSerivce.getUser(route.params['id']).pipe(
           catchError(error => {
               this.alertify.error('problem retriving user details MemberDetailResolver');
               this.router.navigate(['/members']);
               return of(null);
           } )
       );
    }
}
