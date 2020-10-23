import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario';
import { environment } from 'src/environments/environment';


@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Usuario> {

    const body = {
      email,
      password
    };

    return this.http.post(`${environment.apiUrl}/usuarios/login`, body)
      .pipe(
        catchError(e => {
          return of(null);
        })
      );
  }
}
