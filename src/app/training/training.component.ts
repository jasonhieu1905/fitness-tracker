import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromTraining from '../training/training.reducer';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  startTraining: Observable<boolean>;
  constructor(private trainingService: TrainingService,
  private store: Store<fromTraining.State>) { }

  ngOnInit() {
   this.startTraining = this.store.select(fromTraining.getIsTraining);
  }

}
