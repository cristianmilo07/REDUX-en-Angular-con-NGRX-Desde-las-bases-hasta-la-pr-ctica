import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { retry } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registroForm!: FormGroup;

  constructor( 
    private  fb: FormBuilder,
    private autService: AuthService
     ){

  }

  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre:   ['', Validators.required ],
      correo:   ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required ],
    });
  }



  crearUsuario(){
    if( this.registroForm.invalid) {return; }

    const { nombre, correo, password} = this.registroForm.value;
    this.autService.crearUsuario(nombre, correo, password)
  }

}
