import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/security-services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'boxsr-front';
  displayHeader: boolean;
  displayFooter: boolean;
  displayLogin = false;
  displayCarrito = false;
  user: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((x) => {
        // tslint:disable-next-line:no-string-literal
        const url = x['url'] as string;

        if (url.indexOf('admin') > 0) {
          this.displayHeader = false;
          this.displayFooter = false;
        } else {
          this.displayHeader = true;
          this.displayFooter = true;
        }
      });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('APP_USER')
      ? JSON.parse(localStorage.getItem('APP_USER'))
      : [];
  }

  mostrarLogin(display: boolean): void {
    this.displayLogin = display;
  }
  abrirLogin(display: boolean): void {
    this.displayLogin = display;
  }
  cerrarPanel(display: boolean): void {
    this.displayLogin = display;
  }
  cerrarCarrito(display: boolean): void {
    this.displayCarrito = display;
  }
  mostrarCarrito(display: boolean): void {
    this.displayCarrito = display;
    this.user = localStorage.getItem('APP_USER')
      ? JSON.parse(localStorage.getItem('APP_USER'))
      : [];
  }
  perfilUsuario(): void {
    this.router.navigate(['perfil-usuario/:id', { id: this.user.usuario_id }]);
  }
}
