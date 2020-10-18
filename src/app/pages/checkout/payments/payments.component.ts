import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegistroUsuarioService } from 'src/app/services/registro-usuario.service';
import { PedidoService } from 'src/app/admin/services/pedido.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  carritoItems = [];
  usuario: Usuario;
  stripeToken;
  submitted = false;
  messageError = null;
  startDate = new Date(1990, 0, 1);
  id = null;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  stripeForm: FormGroup;
  carritoTotal: number;
  user: any;

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private httpclient: HttpClient,
    private messageService: MessageService,
    public registroService: RegistroUsuarioService,
    public pedidoService: PedidoService,
    public router: Router,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((x) => {
      this.id = x?.id || null;
    });
    this.IniciarstripeForm(fb);
  }

  ngOnInit(): void {
    this.registroService.getUser(this.id).subscribe((x) => {
      this.usuario = x;
      console.log(x);
      this.stripeForm = this.fb.group({
        name: [
          this.usuario.nombre,
          [Validators.required, Validators.maxLength(60)],
        ],
        apellidos: [
          this.usuario.apellidos,
          [Validators.required, Validators.maxLength(145)],
        ],
        email: [
          this.usuario.email,
          [Validators.required, Validators.maxLength(80)],
        ],
        direccion: [
          this.usuario.direccion,
          [Validators.required, Validators.maxLength(145)],
        ],
        codigo_postal: [
          this.usuario.codigo_postal,
          [Validators.required, Validators.maxLength(5)],
        ],
        poblacion: [
          this.usuario.poblacion,
          [Validators.required, Validators.maxLength(60)],
        ],
        provincia: [
          this.usuario.provincia,
          [Validators.required, Validators.maxLength(60)],
        ],
      });
    });

    this.carritoItems = JSON.parse(localStorage.getItem('carritoItems')) || 0;
    this.calcularTotalCarrito();
    this.user = localStorage.getItem('APP_USER')
      ? JSON.parse(localStorage.getItem('APP_USER'))
      : [];
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.stripeForm.invalid) {
      return this.messageService.add({
        severity: 'error',
        summary: 'Administrador',
        detail: 'Los datos no son válidos',
      });
    }

    this.usuario.nombre = this.f.name.value;
    this.usuario.apellidos = this.f.apellidos.value;
    this.usuario.email = this.f.email.value;
    this.usuario.fecha_nacimiento = this.f.fecha_nacimiento.value;
    this.usuario.direccion = this.f.direccion.value;
    this.usuario.codigo_postal = this.f.codigo_postal.value;
    this.usuario.poblacion = this.f.poblacion.value;
    this.usuario.provincia = this.f.provincia.value;

    this.registroService
      .modificarUsuario(this.usuario, this.id)
      .subscribe((resultado) => {
        if (resultado) {
          this.messageService.add({
            severity: 'success',
            summary: 'Todo OK',
            detail: 'Tus datos se han modificado correctamente.',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Hubo un problema al modificar tu perfil.',
          });
        }
      });
    this.router.navigate(['home']);
  }

  calcularTotalCarrito(): void {
    this.carritoTotal = 0;
    this.carritoItems.forEach((item) => {
      this.carritoTotal += item.cantidad * item.precio;
    });
    console.log(this.carritoTotal);
  }

  createToken(): void {
    const name = this.stripeForm.get('name').value;
    const surname = this.stripeForm.get('apellidos').value;
    // tslint:disable-next-line:variable-name
    const receiptemail = this.stripeForm.get('email').value;
    const email = this.stripeForm.get('email').value;

    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          const pedido = {
            id: result.token.id,
            // tslint:disable-next-line:object-literal-shorthand
            name: name,
            items: this.carritoItems,
            totalPedido: this.carritoTotal,
            // tslint:disable-next-line:object-literal-shorthand
            receiptemail: receiptemail,
            email,
          };

          this.httpclient
            .post(`${environment.apiUrl}/checkout`, pedido)
            .subscribe((data) => {
              console.log('transaccion ok');
              console.log(data);
              console.log(this.carritoItems);
            });

          console.log(result.token.id);
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }
  guardarPedido(value): void {
    const pedidoBaseDeDatos = {
     totalDelPedido:  this.carritoTotal,
     fechaPedido: null,
    //  notas:  this.stripeForm.get('notas').value,
     usuarioId: this.user.usuario_id,
     cantidad: null,
     productoId: this.carritoItems,
    };
    console.log(pedidoBaseDeDatos)
    this.pedidoService.guardarPedido(pedidoBaseDeDatos).subscribe((data) => {

    });
  }

  private IniciarstripeForm(fb: FormBuilder): void {
    this.stripeForm = fb.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      apellidos: ['', [Validators.required, Validators.maxLength(145)]],
      fecha_nacimiento: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.maxLength(80)]],
      direccion: ['', [Validators.required, Validators.maxLength(145)]],
      codigo_postal: ['', [Validators.required, Validators.maxLength(5)]],
      poblacion: ['', [Validators.required, Validators.maxLength(60)]],
      provincia: ['', [Validators.required, Validators.maxLength(60)]],
      notas: ['', [Validators.maxLength(360)]],

    });
  }
  get f(): any {
    return this.stripeForm.controls;
  }
}
