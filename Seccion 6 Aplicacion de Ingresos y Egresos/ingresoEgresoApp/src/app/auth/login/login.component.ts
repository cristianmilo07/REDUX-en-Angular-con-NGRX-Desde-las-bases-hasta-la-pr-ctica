import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription

  constructor ( 
    private fb: FormBuilder,
    private autService: AuthService,
    private store: Store< AppState>,
    private router: Router
    ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email] ],
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

  loginUsuario(){
    if( this.loginForm.invalid) {return; }

    this.store.dispatch( ui.isLoading() );


    const { correo, password} = this.loginForm.value;
    this.autService.loginUsuario( correo, password)
      .then( credenciales => {
        console.log(credenciales)
        this.store.dispatch ( ui.stopLoading());
        this.router.navigate(['/login']);
      })

      .catch(err => {
        this.store.dispatch ( ui.stopLoading());
        console.log('error', err)
      });
  }

  
}
