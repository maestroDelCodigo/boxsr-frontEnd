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
  ventasMensuales(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/admin/ventasMensuales`);
    }

  listaAdmin(): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/admin/listaAdmin`);
    }
  }
