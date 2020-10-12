import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  @Input() mostrarCarrito = false;
  // @Output() cerrarPanel = new EventEmitter<void>();

  carritoItems = [];

  constructor() { }

  ngOnInit(): void {
  }

}
