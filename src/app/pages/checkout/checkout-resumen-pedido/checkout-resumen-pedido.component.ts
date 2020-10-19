import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../../../models/pedidos';

@Component({
  selector: 'app-checkout-resumen-pedido',
  templateUrl: './checkout-resumen-pedido.component.html',
  styleUrls: ['./checkout-resumen-pedido.component.scss'],
})
export class CheckoutResumenPedidoComponent implements OnInit {
  carritoItems: Pedidos[] = [];
  carritoTotal: number;
  constructor() {}

  ngOnInit(): void {
    this.carritoItems = JSON.parse(localStorage.getItem('carritoItems')) || 0;
    this.calcularTotalCarrito();
  }

  calcularTotalCarrito(): void {
    this.carritoTotal = 0;
    this.carritoItems.forEach((item) => {
      this.carritoTotal += item.cantidad * item.precio;
    });
    console.log(this.carritoTotal);
  }
}
