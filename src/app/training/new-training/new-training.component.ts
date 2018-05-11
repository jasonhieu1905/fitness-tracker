import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Exercise } from './../exercise.model';
import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<Exercise[]>;
  isLoading: Observable<boolean>;

  constructor(private trainingService: TrainingService, private db: AngularFirestore,
  private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.isLoading = this.store.select(fromTraining.getIsTraining);
    this.exercises = this.store.select(fromTraining.getAvailableExercises);
    this.trainingService.getAvailableExercises();
  }

  startNewTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
