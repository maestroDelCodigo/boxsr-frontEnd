import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { ColeccionesService } from 'src/app/admin/core/colecciones.service';
import { ProductosService } from 'src/app/admin/core/productos.service';
import { Coleccion } from 'src/app/models/coleccion';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  productos: Producto[] = [];
  colecciones: Coleccion[] = [];
  productosColecciones: any[] = [];

  constructor(
    private productosService: ProductosService,
    private coleccionesService: ColeccionesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerColecciones();
  }

  obtenerProductos(): void {
    this.productosService.listarProductos().subscribe((productos: Producto[]) => {
      // filtrar los productos por activos y que no sean muestras
      const productosFiltrados = productos.filter((producto) =>
      producto.nombre.toLocaleLowerCase() !== 'muestra'  && producto.deleted !== 1);

      this.productos = productosFiltrados;
      console.log(this.productos);
    });
  }

  obtenerColecciones(): void {
    this.coleccionesService.listarColecciones().subscribe((colecciones: Coleccion[]) => {

      const coleccionesFiltradas = colecciones.filter((coleccion) =>  coleccion.deleted !== 1);
      this.colecciones = coleccionesFiltradas;
    });
  }

  verProducto(producto: Producto): void {

    if (producto) {
      this.router.navigate(['/producto/', producto.producto_id]);
    }
  }

  verColeccion(coleccion: Coleccion): void {

    if (coleccion) {
      this.router.navigate(['/coleccion/', coleccion.coleccion_id]);
    }
  }
}
