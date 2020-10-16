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


  carritoItems = [];
  carritoItem: any;
  carritoTotal = 0;
  user: any;

  constructor(private messageService: MessengerService, private router: Router, private dataSharingService: DataSharingService,) { }


  ngOnInit(): void {
    this.messageService.getMsg().subscribe((producto: Producto) => {
      this.addProductoAlCarrito(producto);
    });
    this.getLocalItems();
    this.calcularTotalCarrito();

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

  deleteItem(id): void {
    this.carritoItems = localStorage.getItem('carritoItems') ? JSON.parse(localStorage.getItem('carritoItems')) : [];
    let index;
    for (let i = 0; i < this.carritoItems.length; i++) {
      if (this.carritoItems[i].producto_id === id) {
        index = i;
        break;
      }
    }
    if (index === undefined) return
    this.carritoItems.splice(index, 1);
    localStorage.setItem('carritoItems', JSON.stringify(this.carritoItems));

  }

  getLocalItems(): void {
    const localItems = JSON.parse(localStorage.getItem('carritoItems'));
    if (localItems) {
      this.carritoItems = localItems;
    }
  }
  checkOut(): void {
    const login = localStorage.getItem('APP_USER');
    const item = localStorage.getItem('carritoItems');
    if (login.length && item.length) {
      this.cerrarCarrito.emit();
      this.user = localStorage.getItem('APP_USER')
        ? JSON.parse(localStorage.getItem('APP_USER'))
        : [];
      this.router.navigate(['checkout/:id', { id: this.user.usuario_id }]);
    }
    else {
      this.cerrarCarrito.emit();
      this.abrirLogin.emit();
    }

  }
}
