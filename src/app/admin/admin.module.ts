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
import { HomeAdminComponent } from './pages/home-admin/home-admin.component'
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
import { ProductosService } from './core/productos.service';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from 'primeng/dialog';
import { ModificarProductosComponent } from './pages/productos/modificar-productos/modificar-productos.component';
import { CrearColeccionComponent } from './pages/colecciones/crear-coleccion/crear-coleccion.component';
import { ModificarColeccionComponent } from './pages/colecciones/modificar-coleccion/modificar-coleccion.component';
import { ColeccionesService } from './core/colecciones.service';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { OrderListModule } from 'primeng/orderlist';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ColeccionesListComponent } from './pages/colecciones/colecciones-list/colecciones-list.component';


@NgModule({
  declarations: [
    AdminComponent,
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
    ColeccionesListComponent

  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AdminRoutingModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    DigitOnlyModule,
    MatTableModule,
    MatCheckboxModule,
    OrderListModule,
  ],
  providers: [
    ProductosService,
    ColeccionesService
  ]
})
export class AdminModule { }
