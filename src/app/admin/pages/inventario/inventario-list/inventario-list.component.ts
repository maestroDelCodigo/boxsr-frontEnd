import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductosService } from 'src/app/admin/services/productos.service';
import { Producto } from 'src/app/models/producto';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styleUrls: ['./inventario-list.component.scss'],
})
export class InventarioListComponent implements OnInit {
  @Output() modificar = new EventEmitter<Producto>();
  displayedColumns: string[] = ['imagen', 'nombre', 'stock', 'actions'];
  dataSource = new MatTableDataSource<Producto>();
  productosMinimosStock = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosMinimosStock = environment.productosMinimosStock;
    this.cargarListadoProductos();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modificarInventario(producto: Producto): void {
    this.modificar.emit(producto);
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
