import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    console.log(admin)
    return this.http.post<any>(`${environment.apiUrl}/admin/crearAdmin`, admin);
  }
}
