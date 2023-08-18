import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsuarioService } from "src/app/services/usuario.service";
import * as usuariosActions from "../actions";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { of } from "rxjs";


@Injectable()
export class UsuarioEffects {
    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuario$ = createEffect(
        ()=> this.actions$.pipe(
            ofType(usuariosActions.cargarUsuario),
            mergeMap(
                (actions) => this.usuarioService.getUserById(actions.id)
                    .pipe(
                        map( user => usuariosActions.cargarUsuarioSuccess({usuario: user})),
                        catchError(err => of(usuariosActions.cargarUsuarioError({payload: err})))
                    )
            )
        )
    )
}