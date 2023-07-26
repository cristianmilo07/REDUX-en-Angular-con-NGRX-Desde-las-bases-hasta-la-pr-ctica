import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, Validators } from '@angular/forms';


import { Todo } from '../models/todo.model';
import { AppState } from 'src/app/app.reducer';
import * as action from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input()
  todo!: Todo;
  @ViewChild('inputFisico') txtInputFisico : ElementRef
  public loading = false;
  public chkCompletadoField: FormControl = new FormControl;
  public txtInputField: FormControl = new FormControl;
 
  public editando = false;
 
  constructor(
    private store: Store<AppState>
  ) {
 
  }
 
  ngOnInit(): void {
 
    this.chkCompletadoField = new FormControl(this.todo.completado);
    this.txtInputField =  new FormControl(this.todo.texto, Validators.required)

    this.chkCompletadoField.valueChanges.subscribe(valor => {
      this.store.dispatch(action.toggle( {id: this.todo.id}))
    })
  }
  editar(){
    this.editando = true;
    this.txtInputField.setValue(this.todo.texto)
    //es solo para que lo ponga en event Loop y demore un poco
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, );
  }
  terminarEdicion() {
    this.editando= false;

    if(this.txtInputField.invalid) {return;}
    if(this.txtInputField.value === this.todo.texto) {return;}

    this.store.dispatch(
      action.editar({
        id: this.todo.id,
        texto: this.txtInputField.value
      })
    )
  }

  borrar(){
    this.store.dispatch(action.borrar({id: this.todo.id}))
  }

}
