import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito-item',
  templateUrl: './carrito-item.component.html',
  styleUrls: ['./carrito-item.component.scss'],
})
export class CarritoItemComponent implements OnInit {
  @Input() carritoItem: any;
  @Input() deleteItems: any;

  constructor() {}

  ngOnInit(): void {}
}
