import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    return this.http.post(`${environment.apiUrl}/product/actualizarProducto/${producto.producto_id}`, producto)
      .pipe(
        catchError(e => {
          return of(null);
        })
      );
  }

  listarProductos(): Observable<Producto[]>{
    // https://www.learnrxjs.io/learn-rxjs/concepts/get-started-transforming
    return this.http.get(`${environment.apiUrl}/product`)
      .pipe(
        map((productos: Producto[]) => {
          return productos.map(producto => ({
            ...producto,
            imagen_url: producto.imagen_url ? `${environment.urlImagesServer}/${producto.imagen_url}` : ''
          }));
        }),
        catchError(e => {
          return of(null);
        })
      );
  }

  getProducto(id: number): Observable<Producto>{
    return this.http.get(`${environment.apiUrl}/product/${id}`)
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
