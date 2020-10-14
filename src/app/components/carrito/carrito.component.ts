import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessengerService } from 'src/app/admin/core/messenger.service';
import { Producto } from 'src/app/admin/models/producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  @Input() mostrarCarrito = false;
  @Output() cerrarCarrito = new EventEmitter<void>();

  carritoItems = [];
  carritoItem: any;

  carritoTotal = 0;

  constructor(private messageService: MessengerService, private router: Router) {}

  ngOnInit(): void {
    this.messageService.getMsg().subscribe((producto: Producto) => {
      this.addProductoAlCarrito(producto);
    });
    this.getLocalItems();
    console.log(this.carritoItems);
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

    this.calcularTotalCarrito();

    this.mostrarCarrito = !this.mostrarCarrito;
    this.addToStorage();
  }

  calcularTotalCarrito(): void {
    this.carritoTotal = 0;
    this.carritoItems.forEach((item) => {
      this.carritoTotal += item.cantidad * item.precio;
      this.carritoItem = item;
    });
  }

  addToStorage(): void {
    localStorage.removeItem('carritoItems');
    localStorage.setItem('carritoItems', JSON.stringify(this.carritoItems));
  }

  getLocalItems(): void {
    const localItems = JSON.parse(localStorage.getItem('carritoItems'));
    if (localItems.length) {
      this.carritoItems = localItems;
    }
  }
  checkOut(): void{
    this.router.navigate(['checkout']);
    this.cerrarCarrito.emit();
  }
}
