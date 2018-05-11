import { StoreModule } from '@ngrx/store';
import { TrainingService } from './training.service';
import { TrainingRoutingModule } from './training-routing.module';
import { SharedModule } from './../shared/shared.module';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { trainingReducer } from './training.reducer';



@NgModule({
  declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    TrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  providers: [
    TrainingService
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
