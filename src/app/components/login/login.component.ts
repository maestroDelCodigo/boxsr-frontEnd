import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/security-services/auth.service';
import { LoginService } from 'src/app/core/security-services/login.service';
import { Usuario } from 'src/app/models/usuario';
import { DataSharingService } from '../../shared/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  @Input() mostrarLogin = false;
  @Output() cerrarPanel = new EventEmitter<void>();
  @Input() abrirLogin = false;
  error = false;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  id = null;
  usuario: Usuario;
  user: any;
  item: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.user = localStorage.getItem('APP_USER')
      ? JSON.parse(localStorage.getItem('APP_USER'))
      : [];
    if (this.user.usuario_id) {
      console.log(this.user);
      this.dataSharingService.isUserLoggedIn.next(true);
    }
  }

  get f(): any {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.loginService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (user) => {
          if (user) {
            this.authService.storeUser(user);
            this.dataSharingService.isUserLoggedIn.next(true);
            this.cerrarPanel.emit();
            // Dependiendo del tipo de usuario iremos a una pagina o utra de la aplicacion.
            if (user.rol === 'Admin') {
              // this.cerrarPanel.emit();
              this.router.navigate(['admin']);
            } else {
              this.item = localStorage.getItem('carritoItems')
                ? JSON.parse(localStorage.getItem('carritoItems'))
                : [];
              if (this.item.length) {
                this.router.navigate(['checkout/:id', { id: user.usuario_id }]);
              } else {
                this.router.navigate(['home']);
              }
              // this.dataSharingService.isUserLoggedIn.next(true);
              // this.cerrarPanel.emit();
            }
          } else {
            this.error = true;
          }

          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.router.navigate(['home']);
        }
      );
  }

  registrarUsuario(): void {
    this.router.navigate(['registro-usuario']);
    this.cerrarPanel.emit();
  }
}
