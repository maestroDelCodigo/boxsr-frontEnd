import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MessengerService } from 'src/app/admin/core/messenger.service';
import { Producto } from 'src/app/admin/models/producto';
import { Coleccion } from 'src/app/models/coleccion';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit {
  @Input() productos: Producto[];
  @Input() colecciones: Coleccion[];
  @Output() ver = new EventEmitter();
  @Output() verColeccion = new EventEmitter();
  user: any;

  constructor(
    private messengerService: MessengerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('APP_USER')
      ? JSON.parse(localStorage.getItem('APP_USER'))
      : [];
  }

  verProducto(producto: any): void {
    this.ver.emit(producto);
  }

  onVerColeccion(coleccion: any): void {
    this.verColeccion.emit(coleccion);
  }

  AddAlCarrito(producto: any): void {
    this.messengerService.sendMsg({
      ...producto,
      producto_id: 'COL' + producto.coleccion_id,
    });
  }
  checkOut(): void {
    this.router.navigate(['checkout']);
  }
}
