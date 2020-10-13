import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MessengerService } from 'src/app/admin/core/messenger.service';
import { Producto } from 'src/app/admin/models/producto';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {

  @Input() productos: Producto[];
  @Output() ver = new EventEmitter();

  constructor(private messengerService: MessengerService) { }

  ngOnInit(): void {
  }

  verProducto(producto: any): void {
    this.ver.emit(producto);
  }

  AddAlCarrito(producto: Producto): void {
    this.messengerService.sendMsg(producto);
  }

}
