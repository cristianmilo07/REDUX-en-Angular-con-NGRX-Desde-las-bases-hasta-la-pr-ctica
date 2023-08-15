import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsuarioService } from "src/app/services/usuario.service";
import * as usuariosActions from "../actions";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { of } from "rxjs";


@Injectable()
export class UsuariosEffects {
    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuario$ = createEffect(
        ()=> this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),
            mergeMap(
                () => this.usuarioService.getUsers()
                    .pipe(
                        map( users => usuariosActions.cargarUsuariosSuccess({usuarios: users})),
                        catchError(err => of(usuariosActions.cargarUsuariosError({payload: err})))
                    )
            )
        )
    )
    
}