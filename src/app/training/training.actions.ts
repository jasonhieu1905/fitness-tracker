import { Exercise } from './exercise.model';
import { Action } from "@ngrx/store";

export const SET_AVAILABLE_EXERCISES = '[Training] Set available training';
export const SET_FINISHED_EXERCISES= '[Training] Set finished training';
export const START_TRAINING = '[Training] Set start training';
export const STOP_TRAINING = '[Training] Set stop training';

export class SetAvailableTraining implements Action {
    readonly type = SET_AVAILABLE_EXERCISES;

    constructor(public payload: Exercise[]) { }
}

export class SetFinishedTraining implements Action {
    readonly type = SET_FINISHED_EXERCISES;

    constructor(public payload: Exercise[]) { }
}

export class StartTraining implements Action {
    readonly type = START_TRAINING;

    constructor(public payload: Exercise) { }
}

export class StopTraining implements Action {
    readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvailableTraining | SetFinishedTraining | StartTraining | StopTraining;