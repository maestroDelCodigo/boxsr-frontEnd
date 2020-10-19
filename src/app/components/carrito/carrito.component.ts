import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessengerService } from 'src/app/admin/core/messenger.service';
import { Producto } from 'src/app/admin/models/producto';
import { DataSharingService } from 'src/app/shared/data-sharing.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  @Input() mostrarCarrito = false;
  @Output() cerrarCarrito = new EventEmitter<void>();
  @Output() abrirLogin = new EventEmitter<boolean>();
  @Output() cerrarPanel = new EventEmitter<boolean>();
  @Input() user;
  logins = [];
  items = [];
  login: any;
  carritoItems = [];
  carritoItem: any;
  carritoTotal = 0;
  item: any;

  constructor(
    private messageService: MessengerService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit(): void {
    this.messageService.getMsg().subscribe((producto: Producto) => {
      this.addProductoAlCarrito(producto);
    });
    this.getLocalItems();
    this.calcularTotalCarrito();
    this.user = localStorage.getItem('APP_USER')
      ? JSON.parse(localStorage.getItem('APP_USER'))
      : [];
  }
  // Añadir productos al carrito
  addProductoAlCarrito(producto: Producto): void {
    let productoExiste = false;

    for (const i in this.carritoItems) {
      if (this.carritoItems[i].producto_id === producto.producto_id) {
        if (producto.nombre !== 'Muestra') {
          this.carritoItems[i].cantidad++;
        }
        productoExiste = true;
      }
    }

    if (!productoExiste) {
      this.carritoItems.push({
        producto_id: producto.producto_id,
        nombre: producto.nombre,
        cantidad: 1,
        precio: producto.precio,
        tipo_producto: producto.tipo_producto,
        imagen: producto.imagen_url,
      });
      if (producto.nombre === 'Muestra') {
        productoExiste = true;
      }
    }

    this.calcularTotalCarrito();

    this.mostrarCarrito = !this.mostrarCarrito;
    this.addToStorage();
    this.user = localStorage.getItem('APP_USER')
      ? JSON.parse(localStorage.getItem('APP_USER'))
      : [];
  }
  // Total del carrito con actualizacion en tiempo real
  calcularTotalCarrito(): void {
    this.carritoTotal = 0;
    this.carritoItems.forEach((item) => {
      this.item = localStorage.getItem('carritoItems')
        ? JSON.parse(localStorage.getItem('carritoItems'))
        : [];
      this.carritoTotal += item.cantidad * item.precio;
      this.carritoItem = item;
    });
  }
  // Añadir productos al localStorage
  addToStorage(): void {
    localStorage.removeItem('carritoItems');
    localStorage.setItem('carritoItems', JSON.stringify(this.carritoItems));
  }
  // Borrar elementos del carrito
  deleteItem(id): void {
    this.carritoItems = localStorage.getItem('carritoItems')
      ? JSON.parse(localStorage.getItem('carritoItems'))
      : [];
    let index;
    for (let i = 0; i < this.carritoItems.length; i++) {
      if (this.carritoItems[i].producto_id === id) {
        index = i;
        break;
      }
    }
    if (index === undefined) return;
    this.carritoItems.splice(index, 1);
    localStorage.setItem('carritoItems', JSON.stringify(this.carritoItems));

    this.calcularTotalCarrito();
  }

  getLocalItems(): void {
    const localItems = JSON.parse(localStorage.getItem('carritoItems'));
    if (localItems) {
      this.carritoItems = localItems;
    }
  }
  // Ir a la pasarla de pago. Si no estas logueado te manda loguearte y sino directo al checkout
  checkOut(): void {
    this.items = localStorage.getItem('carritoItems')
      ? JSON.parse(localStorage.getItem('carritoItems'))
      : [];
    this.user = localStorage.getItem('APP_USER')
      ? JSON.parse(localStorage.getItem('APP_USER'))
      : [];
    if (this.user) {
      this.router.navigate(['checkout/:id', { id: this.user.usuario_id }]);
    } else {
      this.abrirLogin.emit();
    }
  }

  cerrarCarrito2(): void {
    this.mostrarCarrito = false;
  }
}
