import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {
  constructor(private http: HttpClient) { }

  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${environment.apiUrl}/usuario/crearUsuario`, usuario);
    }
  listaUsuarios(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/usuario/listaUsuarios`);
  }
  getUser(id: number): Observable<Usuario>{
    return this.http.get<any>(`${environment.apiUrl}/usuario/buscarUsuario/${id}`);
  }
  modificarUsuario(usuario: Usuario, id: number): Observable<any> {
      return this.http.post(`${environment.apiUrl}/usuario/modificarUsuario/${id}`, usuario)
        .pipe(
          catchError(e => {
            return of(null);
          })
        );
    }
  }



