import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor ( 
    private fb: FormBuilder,
    private autService: AuthService
    ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required ],
    })
  }

  loginUsuario(){
    if( this.loginForm.invalid) {return; }

    const { correo, password} = this.loginForm.value;
    this.autService.loginUsuario( correo, password)
  }
}
