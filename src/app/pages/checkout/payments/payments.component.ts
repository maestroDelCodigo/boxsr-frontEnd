import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
})
export class PaymentsComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  carritoItems = [];
  stripeToken;

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

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private httpclient: HttpClient
  ) {}

  ngOnInit(): void {
    this.stripeForm = this.fb.group({
      name: ['', [Validators.required]],
    });

    this.carritoItems = JSON.parse(localStorage.getItem('carritoItems')) || 0;
  }

  createToken(formData): void {
    const name = this.stripeForm.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          const pedido = {
            id: result.token.id,
            // tslint:disable-next-line:object-literal-shorthand
            name: name,
            items: this.carritoItems,
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
}
