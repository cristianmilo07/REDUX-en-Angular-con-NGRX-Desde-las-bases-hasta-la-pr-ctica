import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrementar, incrementar } from './contador/contador.actions';
import { AppState } from './app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'redux-app';
  contadors: number | undefined;

  constructor(
    private store: Store<AppState>
  ){
    this.store.select('contador').subscribe(contador => 
      this.contadors = contador
    )

    // más play
    //this.store.select('contador').subscribe(contador => 
    //  this.contadors = contador
  }

  incrementar(){
    this.store.dispatch( incrementar());
  }

  
  decrementar(){
    this.store.dispatch( decrementar());
  }
}
