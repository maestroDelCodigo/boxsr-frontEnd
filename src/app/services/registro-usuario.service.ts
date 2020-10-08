import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {
constructor(private http: HttpClient) { }

crearUsuario(usuario: Usuario): Observable<any>{
  return this.http.post(`${environment.apiUrl}/usuario/crearUsuario`, usuario);
  }
}
