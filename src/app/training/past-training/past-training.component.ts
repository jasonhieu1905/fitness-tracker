import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import * as fromTraining from '../training.reducer';
@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService,
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.store.select(fromTraining.getFinishedExercises).subscribe(res => {
      this.dataSource.data = res;
    })
    this.trainingService.fetchCompletedOrCancelledExercised();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onFilter(filterString: string) {
    this.dataSource.filter = filterString.toString().trim().toLowerCase();
  }

}
