import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../../../models/pedidos';

@Component({
  selector: 'app-checkout-resumen-pedido',
  templateUrl: './checkout-resumen-pedido.component.html',
  styleUrls: ['./checkout-resumen-pedido.component.scss']
})
export class CheckoutResumenPedidoComponent implements OnInit {
  carritoItems: Pedidos [] = [];
  constructor() { }

  ngOnInit(): void {
    this.carritoItems = JSON.parse(localStorage.getItem('carritoItems')) || 0;
    
  }

}
