import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-resumen-pedidos',
  templateUrl: './resumen-pedidos.component.html',
  styleUrls: ['./resumen-pedidos.component.scss']
})
export class ResumenPedidosComponent implements OnInit {

  displayedColumns: string[] = ['pedido_id', 'fecha', 'cliente', 'total', 'pago', 'preparacion', 'articulos'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.cargarListadoPedidos();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  private cargarListadoPedidos(): void {
    this.pedidoService.verPedidos().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }
}
