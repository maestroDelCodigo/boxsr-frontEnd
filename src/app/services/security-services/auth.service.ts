import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly APP_USER = 'APP_USER';

  constructor() { }

  isUserAuthenticated(): boolean {
    return localStorage.getItem(this.APP_USER) !== null;
  }

  storeUser(usuario: Usuario): void {
    localStorage.setItem(this.APP_USER, JSON.stringify(usuario));
  }

  removeUser(): void {
    localStorage.removeItem(this.APP_USER);
  }

  getBearer(): string {
    const user: Usuario = JSON.parse(localStorage.getItem(this.APP_USER));

    if (user?.token) {
      return user.token;
    }

    return null;
  }
}
