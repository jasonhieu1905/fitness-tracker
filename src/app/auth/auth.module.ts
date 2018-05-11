import { TrainingService } from './../training/training.service';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../shared/shared.module';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  imports: [
    SharedModule,
    AngularFireAuthModule,
    AuthRoutingModule
  ],
  providers: [
    AngularFireAuth,
    TrainingService
  ]
})
export class AuthModule { }
