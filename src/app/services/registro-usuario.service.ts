import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, observeOn, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {
  constructor(private http: HttpClient) { }

  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${environment.apiUrl}/usuario/crearUsuario`, usuario)
    }
  }



