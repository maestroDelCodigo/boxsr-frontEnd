import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductosService } from 'src/app/admin/services/productos.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.scss'],
})
export class ProductosListComponent implements OnInit {
  @Output() modificar = new EventEmitter<Producto>();
  @Output() borrar = new EventEmitter<Producto>();
  displayedColumns: string[] = [
    'imagen',
    'codigo_producto',
    'nombre',
    'tipo',
    'peso',
    'precio',
    'deleted',
    'actions',
  ];
  dataSource = new MatTableDataSource<Producto>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarListadoProductos();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modificarProducto(producto: Producto): void {
    this.modificar.emit(producto);
  }

  borrarProducto(producto: Producto): void {
    this.borrar.emit(producto);
  }

  refresh(): void {
    this.productosService.listarProductos().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  private cargarListadoProductos(): void {
    this.productosService.listarProductos().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
