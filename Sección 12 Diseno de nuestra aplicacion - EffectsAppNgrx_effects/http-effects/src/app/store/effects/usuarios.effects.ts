import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsuarioService } from "src/app/services/usuario.service";
import * as usuariosActions from "../actions";
import { mergeMap, tap } from "rxjs/operators";


@Injectable()
export class UsuariosEffects {
    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuario$ = createEffect(
        ()=> this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),
            tap( data => console.log ('effect tap', data)),
            mergeMap(
                () => this.usuarioService.getUsers()
                    .pipe(
                        tap( data => console.log('getUsers effect', data))
                    )
            )
        )
    )
}