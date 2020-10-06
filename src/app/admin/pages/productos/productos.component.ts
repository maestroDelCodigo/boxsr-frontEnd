import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from '../../core/productos.service';
import { Producto } from '../../models/producto';
import { ProductosListComponent } from './productos-list/productos-list.component';

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

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  onMostrarCrearProductos(){
    this.mostrarCrearProductos = true;
  }

  onOcultarCrearProductos(){
    this.mostrarCrearProductos = false;
    this.list.refresh();
  }

  obtenerProductos(){
    this.productosService.listarProductos().subscribe(
      (productos) =>{
        this.productos = productos;

        console.log(productos);
      }
    );
  }

  modificarProducto(producto: Producto){
    this.productoModificar = producto;
    this.mostrarModificarProductos = true;

  }

  onOcultarModificarProductos(){
    this.mostrarModificarProductos = false;
    this.list.refresh();
  }

  borrarProducto(id: number){
   this.productosService.descatalogarProducto(id, 1).subscribe(
     () => this.list.refresh()
   );

  }


}
