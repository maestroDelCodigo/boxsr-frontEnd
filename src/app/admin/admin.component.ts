import { Component, Input, OnInit } from '@angular/core';
import { Admin } from './models/admin';
import { ListadoDeAdminInactivos } from './models/adminsInactivos';
import { AdminService } from './services/admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  admins: Admin[] = [];
  adminsInactivos: ListadoDeAdminInactivos[] = [];
  mostrarCrearProductos = false;
  mostrarModificarProductos = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }
  onMostrarCrearProductos(): void {
    this.mostrarCrearProductos = true;
  }

  onOcultarCrearProductos(): void {
    this.mostrarCrearProductos = false;
  }

  onOcultarModificarProductos(): void {
    this.mostrarModificarProductos = false;
  }




}
