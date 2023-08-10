import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription, retry } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {

  registroForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription

  constructor( 
    private  fb: FormBuilder,
    private autService: AuthService,
    private store: Store<AppState>
     ){

  }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre:   ['', Validators.required ],
      correo:   ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required ],
    });

    this.uiSubscription = this.store.select('ui')
                          .subscribe(ui => {this.cargando = ui.isLoading;
                          console.log('cargando subs');
                          });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario(){
    if( this.registroForm.invalid) {return; }
    this.store.dispatch( ui.isLoading() );

    const { nombre, correo, password} = this.registroForm.value;
    this.autService.crearUsuario(nombre, correo, password)
  }

}
