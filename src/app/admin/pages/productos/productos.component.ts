import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  mostrarCrearProductos = false;
  constructor() { }

  ngOnInit(): void {
  }

  onMostrarCrearProductos(){
    this.mostrarCrearProductos = true;
  }

  onOcultarCrearProductos(){
    this.mostrarCrearProductos = false;
  }

}
