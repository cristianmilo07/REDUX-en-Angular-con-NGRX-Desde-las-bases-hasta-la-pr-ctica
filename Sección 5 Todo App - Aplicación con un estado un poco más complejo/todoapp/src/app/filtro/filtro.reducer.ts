import { createReducer, on } from '@ngrx/store';
import { setFiltro, filtrosValidos } from './filtro.actions';
import { state } from '@angular/animations';

export const initialState: filtrosValidos = 'todos' as filtrosValidos;


export const filtroReducer = createReducer(
    initialState,
    on(setFiltro, (state, {filtro}) => filtro),
);



