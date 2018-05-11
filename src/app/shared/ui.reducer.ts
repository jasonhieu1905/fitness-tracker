import { UIActions, START_LOADING, STOP_LOADING } from './ui.action';

export interface State {
    isLoading: boolean;
}

const initialState = {
    isLoading: false
}

export function uiReducer(state = initialState, action) {
    switch (action.type) {
        case START_LOADING:
            return {
                isLoading: true
            };
        case STOP_LOADING:
            return {
                isLoading: false
            };
        default:
            return state;
    }
}

export const getIsLoading = (state:State) => state.isLoading;