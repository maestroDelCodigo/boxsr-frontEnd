import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of,  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PedidoDetalle } from '../models/pedido-detalle';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  constructor(private http: HttpClient) {}

  verDetallePedidos(): Observable<PedidoDetalle[]>{
    return this.http.get(`${environment.apiUrl}/pedidos/listaPedidos`)
      .pipe(
        catchError(e => {
          return of(null);
        })
      );
  }
 
  
  }
