import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-checkout-resumen-pedido',
  templateUrl: './checkout-resumen-pedido.component.html',
  styleUrls: ['./checkout-resumen-pedido.component.scss']
})
export class CheckoutResumenPedidoComponent implements OnInit {
  carritoItems: Producto [] = [];
  constructor() { }

  ngOnInit() {
    this.carritoItems = JSON.parse(localStorage.getItem('carritoItems')) || 0;
  }

}