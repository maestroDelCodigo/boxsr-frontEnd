import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ColeccionesComponent } from './pages/colecciones/colecciones.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProductosListComponent } from './pages/productos/productos-list/productos-list.component';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    AdminComponent,
    HeaderAdminComponent,
    PedidosComponent,
    ColeccionesComponent,
    ProductosComponent,
    InventarioComponent,
    ClientesComponent,
    ProductosListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class AdminModule { }
