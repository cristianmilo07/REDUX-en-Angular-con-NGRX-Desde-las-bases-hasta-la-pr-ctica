import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent {

  usuarios: Usuario[]= []

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {

    this.store.dispatch(cargarUsuarios())

  }

}
