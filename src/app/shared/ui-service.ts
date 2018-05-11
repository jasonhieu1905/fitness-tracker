import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class UIService {
    isLoading = false;
    loadingStateChanged = new Subject<boolean>();

    constructor(private snackBar: MatSnackBar) {

    }

    changeLoadingState(isLoading) {
        this.loadingStateChanged.next(this.isLoading = isLoading);
    }

    showSnackBar(message, action, duration){
        this.snackBar.open(message, null, {duration: duration});
    }
}