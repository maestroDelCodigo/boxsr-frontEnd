import { Component, Input, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/shared/data-sharing.service';

@Component({
  selector: 'app-carrito-item',
  templateUrl: './carrito-item.component.html',
  styleUrls: ['./carrito-item.component.scss']
})
export class CarritoItemComponent implements OnInit {

  @Input() carritoItem: any;
  @Input() deleteItems: any;

  constructor( private dataSharingService: DataSharingService,) { }

  ngOnInit(): void {
  }

  deleteItem() {

}
}