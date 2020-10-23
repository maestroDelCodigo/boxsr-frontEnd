import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { Producto } from 'src/app/models/producto';
import { ProductosListComponent } from './productos-list/productos-list.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  @ViewChild(ProductosListComponent) list: ProductosListComponent;

  mostrarCrearProductos = false;
  mostrarModificarProductos = false;
  productos: Producto[] = [];
  productoModificar: Producto = null;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  onMostrarCrearProductos(): void {
    this.mostrarCrearProductos = true;
  }

  onOcultarCrearProductos(): void {
    this.mostrarCrearProductos = false;
    this.list.refresh();
  }

  obtenerProductos(): void {
    this.productosService.listarProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  modificarProducto(producto: Producto): void {
    this.productoModificar = producto;
    this.mostrarModificarProductos = true;
  }

  onOcultarModificarProductos(): void {
    this.mostrarModificarProductos = false;
    this.list.refresh();
  }

  borrarProducto(producto: Producto): void {
    const activo = producto.deleted === 0 ? 1 : 0;

    this.productosService
      .descatalogarProducto(producto.producto_id, activo)
      .subscribe(() => this.list.refresh());
  }
}
