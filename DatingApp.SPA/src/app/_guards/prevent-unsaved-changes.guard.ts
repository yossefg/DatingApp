import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { Observable } from 'rxjs';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (component.editFrom.dirty) {
            return confirm('Are you sure you want to continue? any unsaved changes will be lost');
        }
        return true;
    }
}
