import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {

  @Input() productos: Producto[];
  @Output() ver = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  verProducto(producto: any): void {
    this.ver.emit(producto);
    console.log(producto);
  }

}
