import { SetUnauthenticated } from './auth.actions';
import { StartLoading } from './../shared/ui.action';
import { UIService } from './../shared/ui-service';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as fromAuth from '../auth/auth.actions';
import * as fromUI from '../shared/ui.action';

@Injectable()
export class AuthService {

    constructor(private router: Router, private afAuth: AngularFireAuth, 
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store<fromRoot.State>){}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if(user) {
                this.store.dispatch(new fromAuth.SetAuthenticated());
                this.router.navigate(['/training']);
            } else {
                this.cancelSubscription();
                this.store.dispatch(new fromAuth.SetUnauthenticated());
                this.router.navigate(['/login']);
            }
        })
    }

    registerUser(authData: AuthData) {
        this.store.dispatch(new fromAuth.SetAuthenticated());
        this.store.dispatch(new fromUI.StartLoading());
        this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            console.log(result);
            this.store.dispatch(new fromUI.StopLoading());
            this.store.dispatch(new fromAuth.SetUnauthenticated());
        })
        .catch(err => {
            this.store.dispatch(new fromUI.StopLoading());
            this.store.dispatch(new fromAuth.SetUnauthenticated());
        });
   
    }

    login(authData: AuthData) {
        this.store.dispatch(new fromAuth.SetAuthenticated());
        this.store.dispatch(new fromUI.StartLoading());
        this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.store.dispatch(new fromAuth.SetUnauthenticated());
            this.store.dispatch(new fromUI.StopLoading());
            this.router.navigate(['/training']);
        })
        .catch(err => {
            this.store.dispatch(new fromAuth.SetUnauthenticated());
            this.store.dispatch(new fromUI.StopLoading());
            this.uiService.showSnackBar(err.message, null, 3000);
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    cancelSubscription() {
        this.trainingService.cancelSubscription();
    }

}