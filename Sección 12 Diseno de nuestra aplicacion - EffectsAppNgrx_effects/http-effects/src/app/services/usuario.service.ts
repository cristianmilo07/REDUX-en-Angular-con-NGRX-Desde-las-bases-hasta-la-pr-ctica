import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'https://reqres.in/api'

  constructor(
    private http: HttpClient
  ) { }

  getUsers(){
    return this.http.get(`${this.url}/users?per_page=6`)
        .pipe(
          //Error ==> Property 'data' does not exist on type 'Object' || No sabe que viene
          // map(resp => {
          // no sabe que viene en la data sería de esta forma
          //   return resp.data;
          // })
           map((resp:any) => {
             return resp['data'];
           })
        )
  }
}
