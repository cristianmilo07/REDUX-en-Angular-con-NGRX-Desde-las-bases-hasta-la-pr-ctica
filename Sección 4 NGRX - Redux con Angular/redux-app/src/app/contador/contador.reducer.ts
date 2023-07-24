import { createReducer, on } from "@ngrx/store";
import * as actions from "./contador.actions";

//export function contadorReducer(state: number = 10, action: Action) {

//    switch(action.type) {
//        case actions.incrementar.type:
//            return state +1;
//         
//        case actions.decrementar.type:
//            return state -1;
//
//        default:
//            return state;
//    }
//}

export const initialState = 20;

export const contadorReducer = createReducer(
    initialState,
    on(actions.incrementar, (state) => state + 1),
    on(actions.decrementar, (state) => state - 1),
    on(actions.multiplicar, (state, {numero}) => state * numero),
    on(actions.dividir,     (state, {numero}) => state / numero),
    on(actions.reset,       (state) => initialState )

  );