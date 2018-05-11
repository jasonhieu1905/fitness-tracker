import { Action } from "@ngrx/store";

export const SET_AUTHENTICATED = '[Auth] Set authenticated';
export const SET_AUNUTHENTICATED = '[Auth] Set unauthenticated';

export class SetAuthenticated implements Action {
    readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
    readonly type = SET_AUNUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated;