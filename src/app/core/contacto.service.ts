import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of,  } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  
  constructor(private http: HttpClient) {}

  cargarMensaje(contacto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/sugerencia/crearSugerencia`,contacto)
    .pipe(
      catchError(e => {
        return of(null);
      })
    );
}

verMensajes():  Observable<Contacto[]>{
  return this.http.get(`${environment.apiUrl}/sugerencia/verSugerencias`)
    .pipe(
      catchError(e => {
        return of(null);
      })
    );
}

}
