import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DetallePedidoService } from '../../../services/detalle-pedido.service';
import { PedidoDetalle } from '../../../models/pedido-detalle';

interface Estado {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-detalle-pedidos',
  templateUrl: './detalle-pedidos.component.html',
  styleUrls: ['./detalle-pedidos.component.scss'],
})
export class DetallePedidosComponent implements OnInit {
  selectedValue: string;
  estados: Estado[] = [
    { value: 'preparado-0', viewValue: 'Preparado' },
    { value: 'noPreparado-1', viewValue: 'No preparado' },
  ];

  @Output() ver = new EventEmitter<PedidoDetalle>();
  @Input() set row(value: any) {
    if (value) {
      this.dataSource.data = [value];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  displayedColumns: string[] = [
    'nombre',
    'apellidos',
    'email',
    'fecha_creacion',
    'registrado',
    'pedido_id',
    'estado_pago',
    'estado_preparacion',
    // 'estado',
    'notas',
    'fecha_pedido',
    'iva',
    'total_pedido',
    'nombre_producto',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private detallePedidoService: DetallePedidoService) {}

  ngOnInit(): void {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modificarProducto(pedidoDetalle: PedidoDetalle): void {
    this.ver.emit(pedidoDetalle);
  }

  refresh(): void {
    this.detallePedidoService.verDetallePedidos().subscribe((data) => {
      this.dataSource.data = data;
    });
  }
  // private verDetallePedido(): void {
  //   this.detallePedidoService.verDetallePedidos().subscribe((data) => {
  //     this.dataSource.data = data;
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   });
  // }
}
