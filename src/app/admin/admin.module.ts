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
import { HomeAdminComponent } from './pages/home-admin/home-admin.component';
import { CrearAdminComponent } from './pages/home-admin/crear-admin/crear-admin.component';
import { MessageService } from 'primeng/api';
import { ListaAdminComponent } from './pages/home-admin/lista-admin/lista-admin.component';
import { ModificarAdminComponent } from './pages/home-admin/modificar-admin/modificar-admin.component';
import { ProductosListComponent } from './pages/productos/productos-list/productos-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CrearProductosComponent } from './pages/productos/crear-productos/crear-productos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosService } from './services/productos.service';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from 'primeng/dialog';
import { ModificarProductosComponent } from './pages/productos/modificar-productos/modificar-productos.component';
import { CrearColeccionComponent } from './pages/colecciones/crear-coleccion/crear-coleccion.component';
import { ModificarColeccionComponent } from './pages/colecciones/modificar-coleccion/modificar-coleccion.component';
import { ColeccionesService } from './services/colecciones.service';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { OrderListModule } from 'primeng/orderlist';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ColeccionesListComponent } from './pages/colecciones/colecciones-list/colecciones-list.component';
import { InventarioListComponent } from './pages/inventario/inventario-list/inventario-list.component';
import { ModificarInventarioComponent } from './pages/inventario/modificar-inventario/modificar-inventario.component';
import { ContactoService } from '../services/contacto.service';
import { BuzonComponent } from './pages/buzon/buzon.component';
import { BuzonAdminComponent } from './pages/buzon/buzon-admin/buzon-admin.component';
import { ClientesListComponent } from './pages/clientes/clientes-list/clientes-list.component';
import { ResumenPedidosComponent } from './pages/pedidos/resumen-pedidos/resumen-pedidos.component';
import { PedidoService } from './services/pedido.service';
import { DetallePedidosComponent } from './pages/pedidos/detalle-pedidos/detalle-pedidos.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { NumericDirective } from '../directives/numeric-directive';

@NgModule({
  declarations: [
    DetallePedidosComponent,
    ResumenPedidosComponent,
    AdminComponent,
    BuzonComponent,
    HeaderAdminComponent,
    PedidosComponent,
    ColeccionesComponent,
    ProductosComponent,
    InventarioComponent,
    ClientesComponent,
    HomeAdminComponent,
    ListaAdminComponent,
    ModificarAdminComponent,
    CrearAdminComponent,
    CrearProductosComponent,
    ModificarProductosComponent,
    CrearColeccionComponent,
    ModificarColeccionComponent,
    ProductosListComponent,
    ColeccionesListComponent,
    InventarioListComponent,
    ModificarInventarioComponent,
    BuzonAdminComponent,
    ClientesListComponent,
    NumericDirective,
  ],
  imports: [
    MatSelectModule,
    MatDialogModule,
    MatSortModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AdminRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    DigitOnlyModule,
    MatCheckboxModule,
    OrderListModule,
  ],
  providers: [
    ProductosService,
    ColeccionesService,
    ContactoService,
    PedidoService,
  ],
})
export class AdminModule {}
