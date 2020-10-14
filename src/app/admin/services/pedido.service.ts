import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of,  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pedido } from '../models/pedido';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {


  constructor(private http: HttpClient) {}

//   cargarMensaje(pedido): Observable<any> {
//     return this.http.post(`${environment.apiUrl}/pedidos/crearPedido`,pedido)
//     .pipe(
//       catchError(e => {
//         return of(null);
//       })
//     );
// }

verPedidos(): Observable<Pedido[]>{
  return this.http.get(`${environment.apiUrl}/pedidos/listaPedidos`)
    .pipe(
      catchError(e => {
        return of(null);
      })
    );
}

}
