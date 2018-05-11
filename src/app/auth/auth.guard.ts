import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route} from '@angular/router';
import * as fromRoot from '../app.reducer';
import { take } from 'rxjs/operators';
@Injectable()
export class AuthGuard implements CanActivate, CanLoad{

    constructor(private authService: AuthService, private router: Router,
    private store: Store<fromRoot.State>){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       return this.store.select(fromRoot.getIsAuthed).pipe(take(1));
    }

    canLoad(route: Route) {
        return this.store.select(fromRoot.getIsAuthed).pipe(take(1));;
    }
}