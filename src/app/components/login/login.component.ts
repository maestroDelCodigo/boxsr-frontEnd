import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/security-services/auth.service';
import { LoginService } from 'src/app/core/security-services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  @Input() mostrarLogin = false;
  @Output() cerrarPanel = new EventEmitter<void>();

  error = false;
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f(): any { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;

    this.loginService.login(this.f.username.value, this.f.password.value).pipe(first())
      .subscribe(
        (user) => {

          if (user) {
            this.authService.storeUser(user);

            // Dependiendo del tipo de usuario iremos a una pagina o utra de la aplicacion.
            if (user.rol === 'Admin'){
              console.log('admin');
              this.cerrarPanel.emit();
              this.router.navigate(['admin']);
            }
            else{
              this.router.navigate(['']); // a donde entra un usuario no administrado ?????
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
}
