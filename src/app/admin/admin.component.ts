import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  ventasDiarias = [
    { total_pedido: 124 },
    { total_pedido: 124 },
    { total_pedido: 2 },
    { total_pedido: 10 }
  ];

  totalVentasDiarias: number;

  constructor() { }

  ngOnInit(): void {
    this.calcularVentasDiarias();
  }

  calcularVentasDiarias(): void {
    this.totalVentasDiarias = this.ventasDiarias.map(venta => venta.total_pedido).reduce((acc, venta) => acc + venta);
  }

}
