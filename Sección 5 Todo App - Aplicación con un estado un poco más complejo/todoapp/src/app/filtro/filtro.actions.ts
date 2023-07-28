import { createAction, props } from '@ngrx/store';

export type filtrosValidos = 'todos' | 'completados' | 'pendientes';

export const setFiltro = createAction(
    '[Filtro] Set Filtro',
    props<{ filtro: filtrosValidos}>()
)

export const completado = createAction(
    '[Completado] Todo completado',
    props<{ completado: boolean }>()
)