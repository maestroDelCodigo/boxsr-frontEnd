import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';


import {DetallePedidoService} from '../../services/detalle-pedido.service'
import { PedidoDetalle } from '../../models/pedido-detalle';
import {DetallePedidosComponent} from '../pedidos/detalle-pedidos/detalle-pedidos.component'
import { ResumenPedidosComponent } from './resumen-pedidos/resumen-pedidos.component';
import { Pedido } from '../../models/pedido';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {
  @ViewChild(ResumenPedidosComponent) list: ResumenPedidosComponent;

  @Input() display: boolean;
  @Output() cerrarDialogo = new EventEmitter<void>();
  mostrarPedido = false;
  pedidos:PedidoDetalle[]=[];
  pedidoDetalle: PedidoDetalle = null;
  pedido_id: any;
  constructor(private detallePedidoService:DetallePedidoService) { }

  ngOnInit(): void {

  }
 
  detallePedido2(pedidoDetalle: PedidoDetalle): void {
  
 
  this.pedidoDetalle= pedidoDetalle;
  console.log(this.pedidoDetalle)
  this.mostrarPedido=true;

}

ocultarPedido(): void {
this.mostrarPedido=false;
// this.list.refresh();
}

}
