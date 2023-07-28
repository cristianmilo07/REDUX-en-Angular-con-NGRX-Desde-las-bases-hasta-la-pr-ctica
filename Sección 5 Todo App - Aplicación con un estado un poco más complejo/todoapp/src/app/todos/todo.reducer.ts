import { createReducer, on } from '@ngrx/store';
import { borrar, crear, editar, limpiarTodos, togglAll, toggle } from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial:Todo[] = [
    new Todo('Salvar el mundo'),
    new Todo('b'),
    new Todo('c'),
    new Todo('d'),
];

export const todoReducer = createReducer(
    estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),

  on(toggle, (state, {id}) => {
    return state.map( todo => {
      if( todo.id === id ) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }
    })

  }),

  on(editar, (state, {id, texto}) => {
    return state.map( todo => {
      if( todo.id === id ) {
        return {
          ...todo,
          texto: texto
        }
      } else {
        return todo;
      }
    })

  }),

  on( borrar, (state, {id}) => state.filter( todo => todo.id !== id)),

  on(togglAll, (state, { completado }) => state.map( todo => {
    return{
      ...todo,
      completado: completado
    }
  }) 
  ),

  on ( limpiarTodos, state => state.filter (todo => !todo.completado) )


);