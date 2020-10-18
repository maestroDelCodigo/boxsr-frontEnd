import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/admin/core/productos.service';
import { Producto } from 'src/app/admin/models/producto';
import { MessengerService } from 'src/app/admin/core/messenger.service';

@Component({
  selector: 'app-muestras-comprar',
  templateUrl: './muestras-comprar.component.html',
  styleUrls: ['./muestras-comprar.component.scss'],
})
export class MuestrasComprarComponent implements OnInit {
  producto: Producto;
  productos: Producto[] = [];
  productoSeleccionado: Producto = null;

  constructor(
    private productosService: ProductosService,

    private messengerService: MessengerService
  ) {}

  ngOnInit(): void {
    this.productosService.listarProductos().subscribe((productos) => {
      const productoBuscado = productos.filter(
        (producto) => producto.nombre.toLowerCase() === 'muestra'
      );
      this.productos = productoBuscado;
      this.producto = this.productos[0];
    });
  }

  AddAlCarrito(): void {
    if (this.productoSeleccionado) {
      this.messengerService.sendMsg(this.productoSeleccionado);
    }
  }
  // tslint:disable-next-line: typedef
  SeleccionarProducto(producto: Producto) {
    this.productoSeleccionado = producto;
  }
}
