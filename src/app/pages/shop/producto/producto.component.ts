import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColeccionesService } from 'src/app/admin/core/colecciones.service';
import { ProductosService } from 'src/app/admin/core/productos.service';
import { Coleccion } from 'src/app/models/coleccion';
import { Producto } from 'src/app/admin/models/producto';
import { MessengerService } from 'src/app/admin/core/messenger.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {
  producto: Producto;
  coleccion: Coleccion;

  private productoId: any;

  constructor(
    private productosService: ProductosService,
    private coleccionesService: ColeccionesService,
    private router: Router,
    private messengerService: MessengerService,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((x) => {
      this.productoId = x?.id || null;
    });
  }

  ngOnInit(): void {
    if (this.productoId) {
      this.productosService.getProducto(this.productoId).subscribe(x => {
        this.producto = x;
        console.log(this.producto);
        console.log(this.producto.imagen_url);
      });
    }
  }

  AddAlCarrito(): void {
    this.messengerService.sendMsg(this.producto);
  }
}
