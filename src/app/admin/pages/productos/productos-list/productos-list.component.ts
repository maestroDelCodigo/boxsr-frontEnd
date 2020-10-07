import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductosService } from 'src/app/admin/core/productos.service';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.scss']
})
export class ProductosListComponent implements OnInit  {
  @Output() modificar = new EventEmitter<Producto>();
  @Output() borrar = new EventEmitter<number>();
  displayedColumns: string[] = ['imagen', 'id', 'nombre', 'tipo', 'stock', 'peso', 'precio', 'deleted', 'actions'];
  dataSource = new MatTableDataSource<Producto>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productosService: ProductosService) { }

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

  modificarProducto(producto: Producto): void{
    this.modificar.emit(producto);
  }

  borrarProducto(id: number): void{
    this.borrar.emit(id);
  }

  refresh(): void{
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

