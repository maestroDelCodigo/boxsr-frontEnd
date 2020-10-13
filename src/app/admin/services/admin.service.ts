import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) { }

  ventasDiarias(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/ventasDiarias`);
  }
  ventasMensuales(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/ventasMensuales`);
  }

  listaAdminActivos(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/listaAdminActivos`);
  }
  listaAdminInactivos(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/admin/listaAdminInactivos`);
  }
  crearAdmin(admin: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/admin/crearAdmin`, admin);
  }
  modificarAdmin(admin: Admin): Observable<any> {
    return this.http.post(`${environment.apiUrl}/admin/modificarAdmin/${admin.usuario_id}`, admin)
      .pipe(
        catchError(e => {
          return of(null);
        })
      );
  }
  // tslint:disable-next-line:variable-name
  desactivarAdmin(usuario_id: number, deletedAdmin: number): Observable<any> {

    const body =  {
      deleted : deletedAdmin
    };

    return this.http.post(`${environment.apiUrl}/admin/desactivarAdmin/${usuario_id}`, body)
      .pipe(
        catchError(e => {
          return of(null);
        })
      );
  }
}
