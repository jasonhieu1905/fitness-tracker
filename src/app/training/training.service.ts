import { take } from 'rxjs/operators';
import { getActiveExercise } from './training.reducer';
import { SetAvailableTraining, StartTraining, SetFinishedTraining, StopTraining } from './training.actions';
import { Store } from '@ngrx/store';
import { UIService } from './../shared/ui-service';
import { Subscription } from 'rxjs/Subscription';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import * as fromUI from '../shared/ui.action';
import * as fromTraining from '../training/training.actions';
import * as fromTrainingReducer from '../training/training.reducer';
@Injectable()
export class TrainingService {
    private availableExercises: Exercise[] = [];
    finishedExercises: Exercise[] = [];

    private exercisesSubscriptions: Subscription[] = [];


    constructor(private db: AngularFirestore,
        private store: Store<fromTrainingReducer.State>) { }

    getAvailableExercises() {
        this.store.dispatch(new fromUI.StartLoading());
        this.exercisesSubscriptions.push(this.db.collection('availableExercises')
            .snapshotChanges().map(res => {
                return res.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        name: doc.payload.doc.data().name,
                        duration: doc.payload.doc.data().duration,
                        calories: doc.payload.doc.data().calories
                    };
                });
            }).subscribe(data => {
                this.store.dispatch(new fromUI.StopLoading());
                this.store.dispatch(new fromTraining.SetAvailableTraining(data));
            }));
    }

    startExercise(id) {
        this.store.dispatch(new fromTraining.StartTraining(id));
    }

    completeExercise() {
        this.store.select(fromTrainingReducer.getActiveExercise).pipe(take(1)).subscribe(res => {
            this.addExerciseToDatabase({
                ...res,
                date: new Date(),
                state: 'completed'
            });
            this.store.dispatch(new fromTraining.StopTraining());
        })
    }

    cancelSubscription() {
        this.exercisesSubscriptions.forEach(item => item.unsubscribe());
    }

    cancelExercise(progress: number) {
        this.store.select(fromTrainingReducer.getActiveExercise).pipe(take(1)).subscribe(res => {
            this.addExerciseToDatabase({
                ...res,
                duration: res.duration * (progress / 100),
                calories: res.calories * (progress / 100),
                date: new Date(),
                state: 'cancelled'
            });
            this.store.dispatch(new fromTraining.StopTraining());
        })
        this.store.dispatch(new fromTraining.StopTraining());
    }

    fetchCompletedOrCancelledExercised() {
        this.exercisesSubscriptions.push(this.db.collection('finishedExercise').valueChanges().subscribe((res: Exercise[]) => {
            this.store.dispatch(new fromTraining.SetFinishedTraining(res));
        }));
    }

    addExerciseToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercise').add(exercise);
    }

}