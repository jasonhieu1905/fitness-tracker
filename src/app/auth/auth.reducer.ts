import { AuthActions, SET_AUTHENTICATED, SET_AUNUTHENTICATED } from './auth.actions';

export interface State {
    isAuthenticated: boolean;
}

const initialState = {
    isAuthenticated: false
}

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                isAuthenticated: true
            };
        case SET_AUNUTHENTICATED:
            return {
                isAuthenticated: false
            };
        default:
            return state;
    }
}

export const getIsAuthed = (state:State) => state.isAuthenticated;