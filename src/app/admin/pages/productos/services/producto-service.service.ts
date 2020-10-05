import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoServiceService {
  constructor(private http: HttpClient) {}

  cargarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>('http://localhost:8080/product')
    .pipe(
      map(datos => datos.map(x => new Producto(x))));
  }
}
