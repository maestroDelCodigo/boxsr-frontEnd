import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { InventarioListComponent } from './inventario-list/inventario-list.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  @ViewChild(InventarioListComponent) list: InventarioListComponent;
  mostrarModificarInventario = false;
  inventarioModificar: Producto = null;
  constructor() { }

  ngOnInit(): void {
  }

  onOcultarModificarInventario(): void{
    this.mostrarModificarInventario = false;
    this.list.refresh();
  }

  modificarInventario(producto: Producto): void{
    this.inventarioModificar = producto;
    this.mostrarModificarInventario = true;
  }


}
