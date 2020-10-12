import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColeccionesService } from 'src/app/admin/core/colecciones.service';
import { ProductosService } from 'src/app/admin/core/productos.service';
import { Coleccion } from 'src/app/admin/models/Coleccion';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent implements OnInit {
  producto: Producto;
  coleccion: Coleccion;
  url: any;

  private productoId: any;

  constructor(
    private productosService: ProductosService,
    private coleccionesService: ColeccionesService,
    private router: Router,
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
}
