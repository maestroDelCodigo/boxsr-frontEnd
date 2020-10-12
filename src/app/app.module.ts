import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { MuestrasComponent } from './pages/muestras/muestras.component';
import { ShopComponent } from './pages/shop/shop.component';
import { SobreBoxsrComponent } from './pages/sobre-boxsr/sobre-boxsr.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProductoComponent } from './pages/shop/producto/producto.component';
import { ProductosService } from './admin/core/productos.service';
import { ColeccionesService } from './admin/core/colecciones.service';
import { ShopListComponent } from './pages/shop/shop-list/shop-list.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DialogModule } from 'primeng/dialog';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrderListModule } from 'primeng/orderlist';
import { ContactoComponent } from './pages/contacto/contacto.component';


@NgModule({
  declarations: [
    ContactoComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    MuestrasComponent,
    ShopComponent,
    SobreBoxsrComponent,
    ProductoComponent,
    ShopListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatStepperModule,
    SidebarModule,
    ToastModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    AdminRoutingModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    DialogModule,
    DigitOnlyModule,
    MatTableModule,
    MatCheckboxModule,
    OrderListModule,




  ],
  providers: [MessageService, ProductosService, ColeccionesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
