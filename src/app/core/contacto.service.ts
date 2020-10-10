import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  constructor(private http: HttpClient) {}

  cargarMensaje(): Observable<Contacto[]> {
    return this.http.get<Contacto[]>('http://localhost:8080/contacto')
    .pipe(
      map(datos => datos.map(x => new Contacto(x))));
  }
}

