import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule} from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TrainingComponent } from './training/training.component';
import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
    { path: '', component: WelcomeComponent, canActivate: [AuthGuard]},
    { path: 'training', loadChildren: './training/training.module#TrainingModule', canLoad: [AuthGuard]}
]
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }