import { Store } from '@ngrx/store';
import { UIService } from './../../shared/ui-service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: Observable<boolean>;
  loginForm;
  constructor(private authService: AuthService, private uiService: UIService,
  private store: Store<{ui: fromRoot.State}>) { }


  ngOnInit() {
    this.isLoading = this.store.select(fromRoot.getIsLoading);
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    });
    
  }

  onSubmit(loginForm) {
    this.authService.login({
      email: loginForm.value.email,
      password: loginForm.value.password
    });
    
  }

}
 