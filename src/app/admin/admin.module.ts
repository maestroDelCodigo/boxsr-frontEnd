import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ColeccionesComponent } from './pages/colecciones/colecciones.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';

@NgModule({
  declarations: [
    AdminComponent,

    HeaderAdminComponent,
    PedidosComponent,
    ColeccionesComponent,
    ProductosComponent,
    InventarioComponent,
    ClientesComponent,
    HomeAdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
