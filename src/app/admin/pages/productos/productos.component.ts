import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../core/productos.service';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

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
  }

  borrarProducto(id: number){
   this.productosService.descatalogarProducto(id, 1).subscribe(
     () => this.obtenerProductos()
   );

  }


}
