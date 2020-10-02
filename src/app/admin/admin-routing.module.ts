import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ColeccionesComponent } from './pages/colecciones/colecciones.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { ProductosComponent } from './pages/productos/productos.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
    path: 'clientes',
    component: ClientesComponent,
  },
  {
    path: 'colecciones',
    component: ColeccionesComponent,
  },
  {
    path: 'inventario',
    component: InventarioComponent,
  },
  {
    path: 'pedidos',
    component: PedidosComponent,
  },
  {
    path: 'productos',
    component: ProductosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
