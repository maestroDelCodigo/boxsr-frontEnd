import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Coleccion } from '../models/Coleccion';

@Injectable()
export class ColeccionesService {

  constructor(private http: HttpClient) { }

  crearColeccion(coleccion: Coleccion): Observable<any> {

    return this.http.post(`${environment.apiUrl}/coleccion/crearColeccion`, coleccion)
      .pipe(
        catchError(e => {
          return of(null);
        })
      );
  }

  // tslint:disable-next-line: no-shadowed-variable
  modificarColeccion(coleccion: Coleccion): Observable<any> {
    return this.http.post(`${environment.apiUrl}/coleccion/modificarColeccion/${coleccion.coleccion_id}`, coleccion)
      .pipe(
        catchError(e => {
          return of(null);
        })
      );
  }

  listarColecciones(): Observable<Coleccion[]>{
    return this.http.get(`${environment.apiUrl}/coleccion`)
      .pipe(
        catchError(e => {
          return of(null);
        })
      );
  }

  descatalogarColeccion(idColeccion: number, deletedColeccion: boolean): Observable<any> {

    const body =  {
      deleted : deletedColeccion
    };

    return this.http.post(`${environment.apiUrl}/coleccion/inactivarColeccion/${idColeccion}`, body)
      .pipe(
        catchError(e => {
          return of(null);
        })
      );
  }

  buscarColeccion(idColeccion: number): Observable<Coleccion>{
    return this.http.get(`${environment.apiUrl}/coleccion/buscarColeccion/${idColeccion}`)
      .pipe(
        catchError(e => {
          return of(null);
        })
      );
  }

  obtenerProductosAsociados(idColeccion: number): Observable<any>{
    return this.http.get(`${environment.apiUrl}/coleccion/productos/${idColeccion}`)
    .pipe(
      catchError(e => {
        return of(null);
      })
    );

  }
}
