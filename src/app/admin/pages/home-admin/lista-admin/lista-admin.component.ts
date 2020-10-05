
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AdminService } from 'src/app/admin/services/admin.service';
import { ListadoDeAdmin } from '../../../models/admin'

@Component({
  selector: 'app-lista-admin',
  templateUrl: './lista-admin.component.html',
  styleUrls: ['./lista-admin.component.scss']
})
export class ListaAdminComponent implements OnInit  {
  @Output() modificar = new EventEmitter<ListadoDeAdmin>();
  displayedColumns: string[] = [ 'nombre', 'apellidos', 'email', 'password', 'actions', 'deleted'];
  dataSource: MatTableDataSource<ListadoDeAdmin>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.listarAdmin();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modificarProducto(admin: ListadoDeAdmin): void {
    this.modificar.emit(admin);
  }

  private listarAdmin(): void {
    this.adminService.listaAdminActivos().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}