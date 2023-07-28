import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as action from '../todo.actions';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css']
})
export class TodoPageComponent {

  completado: boolean = false

  constructor(
    private store: Store<AppState>
  ) {
 
  }

  toggleAll(){
    this.completado =!this.completado
    this.store.dispatch(action.togglAll({completado: this.completado}))
  }

}



