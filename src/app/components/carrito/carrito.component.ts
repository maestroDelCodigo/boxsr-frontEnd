import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/admin/core/messenger.service';
import { Producto } from 'src/app/admin/models/producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  @Input() mostrarCarrito = false;
  // @Output() cerrarPanel = new EventEmitter<void>();

  carritoItems = [];

  carritoTotal = 0;

  constructor(private messageService: MessengerService) {}

  ngOnInit(): void {
    this.messageService.getMsg().subscribe((producto: Producto) => {
      this.addProductoAlCarrito(producto);
    });
  }

  addProductoAlCarrito(producto: Producto): void {
    let productoExiste = false;

    for (const i in this.carritoItems) {
      if (this.carritoItems[i].producto_id === producto.producto_id) {
        this.carritoItems[i].cantidad++;
        productoExiste = true;
      }
    }

    if (!productoExiste) {
      this.carritoItems.push({
        producto_id: producto.producto_id,
        nombre: producto.nombre,
        cantidad: 1,
        precio: producto.precio,
      });
    }

    this.carritoTotal = 0;
    this.carritoItems.forEach((item) => {
      this.carritoTotal += item.cantidad * item.precio;
    });
  }
}
