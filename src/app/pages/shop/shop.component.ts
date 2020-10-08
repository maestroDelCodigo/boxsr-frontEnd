import { Component, OnInit } from '@angular/core';
import { ColeccionesService } from 'src/app/admin/core/colecciones.service';
import { ProductosService } from 'src/app/admin/core/productos.service';
import { Coleccion } from 'src/app/admin/models/Coleccion';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  productos: any[] = [];
  colecciones: Coleccion[] = [];
  productosColecciones: Producto[] = [];

  constructor(
    private productosService: ProductosService,
    private coleccionesService: ColeccionesService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerColecciones();
    this.obtenerTodo();
  }

  obtenerProductos(): void {
    this.productosService.listarProductos().subscribe((productos) => {
      this.productos = productos;
      console.log(this.productos);
    });
  }

  obtenerColecciones(): void {
    this.coleccionesService.listarColecciones().subscribe((colecciones) => {
      this.colecciones = colecciones;
      console.log(colecciones);
    });
  }

  obtenerTodo(): void {
    Array.prototype.push.apply(this.productos, this.colecciones);
    console.log(this.productos);
  }
}
