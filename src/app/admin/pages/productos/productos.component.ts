import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../../core/productos.service';
import { Producto } from 'src/app/models/producto';
import { ProductosListComponent } from './productos-list/productos-list.component';
import { TiposProductoService } from '../../../services/tipos-producto.service';
import { IdName } from '../../models/id-name';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  @ViewChild(ProductosListComponent) list: ProductosListComponent;

  mostrarCrearProductos = false;
  mostrarModificarProductos = false;
  productos: Producto[] = [];
  productoModificar: Producto = null;
  tipoProducto: IdName[];

  constructor(private productosService: ProductosService, private tiposProducto:TiposProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.tipoProducto=this.tiposProducto.getTipoProducto();
  }

  onMostrarCrearProductos(): void{
    this.mostrarCrearProductos = true;
  }

  onOcultarCrearProductos(): void{
    this.mostrarCrearProductos = false;
    this.list.refresh();
  }

  obtenerProductos(): void{
    this.productosService.listarProductos().subscribe(
      (productos) => {
        this.productos = productos;
      }
    );
  }

  modificarProducto(producto: Producto): void{
    this.productoModificar = producto;
    this.mostrarModificarProductos = true;

  }

  onOcultarModificarProductos(): void{
    this.mostrarModificarProductos = false;
    this.list.refresh();
  }

  borrarProducto(id: number): void{
   this.productosService.descatalogarProducto(id, 1).subscribe(
     () => this.list.refresh()
   );

  }


}
