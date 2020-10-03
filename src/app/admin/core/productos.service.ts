import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto';

@Injectable()
export class ProductosService {

  constructor(private http: HttpClient) { }

  crearProducto(producto: Producto): Observable<any> {

    return this.http.post(`${environment.apiUrl}/product/crearProducto`, producto)
      .pipe(
        catchError(e => {
          return of(null);
        })
      );
  }

  modificarProducto(producto: Producto): Observable<any> {
    return this.http.post(`${environment.apiUrl}/product/actualizarProducto/${producto.codigo_producto}`, producto)
      .pipe(
        catchError(e => {
          return of(null);
        })
      );
  }

  listarProductos(): Observable<Producto[]>{
    return this.http.get(`${environment.apiUrl}/product`)
      .pipe(
        catchError(e => {
          return of(null);
        })
      );
  }

  descatalogarProducto(idProducto: number, deletedProducto: number): Observable<any> {

    const body =  {
      deleted : deletedProducto
    };

    return this.http.post(`${environment.apiUrl}/product/descatalogarProducto/${idProducto}`, body)
      .pipe(
        catchError(e => {
          return of(null);
        })
      );
  }
}
