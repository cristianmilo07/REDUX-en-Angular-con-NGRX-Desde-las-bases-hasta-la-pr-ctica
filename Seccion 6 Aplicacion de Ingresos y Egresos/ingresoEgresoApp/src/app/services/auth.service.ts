import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState, Unsubscribe } from '@angular/fire/auth';
import { setDoc, Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { User } from '../models/usuario.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userUnsubscribe!: Unsubscribe;
 
  constructor(
                private auth: Auth, 
                private firestore: Firestore,
                private store: Store<AppState>
                ) { }
 
  initAuthListener() {
    authState(this.auth).subscribe( fUser => {
      console.log(fUser);
      console.log(fUser?.uid);
      console.log(fUser?.email);

      if(fUser) {
        this.userUnsubscribe = onSnapshot(
          doc(this.firestore, fUser.uid, 'user'),
          (docUser: any) => {
            let data: any = docUser.data();
            let user = User.fromFirebase(data);
            this.store.dispatch(authActions.setUser({ user }));
          },
          (err => {
            console.log(err);
          })
        )
      } else {
        this.userUnsubscribe ? this.userUnsubscribe() : null;
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }
 
  crearUsuario(nombre: string, correo: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, correo, password)
            .then( ({ user }) => {
              const newUser = new User(user.uid, nombre, correo);
              return setDoc(doc(this.firestore, user.uid, 'user'), {...newUser});
            });
  }
 
  loginUsuario(correo: string, password: string) {
    return signInWithEmailAndPassword (this.auth, correo, password);
  }
 
  logout() {
    return signOut(this.auth);
  }
 
  isAuth() {
    return authState(this.auth).pipe(
      map(fUser => fUser !== null)
    )
  }
 
}