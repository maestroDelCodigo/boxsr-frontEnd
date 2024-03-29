import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColeccionesService } from 'src/app/admin/services/colecciones.service';
import { Coleccion } from 'src/app/models/coleccion';

@Component({
  selector: 'app-colecciones-list',
  templateUrl: './colecciones-list.component.html',
  styleUrls: ['./colecciones-list.component.scss'],
})
export class ColeccionesListComponent implements OnInit {
  @Output() modificar = new EventEmitter<Coleccion>();
  @Output() borrar = new EventEmitter<Coleccion>();
  displayedColumns: string[] = [
    'imagen',
    'nombre',
    'video',
    'precioRebajado',
    'precioOriginal',
    'deleted',
    'actions',
  ];
  dataSource = new MatTableDataSource<Coleccion>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private coleccionesService: ColeccionesService) {}

  ngOnInit(): void {
    this.cargarListadoColecciones();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modificarColeccion(coleccion: Coleccion): void {
    this.modificar.emit(coleccion);
  }

  borrarColeccion(coleccion: Coleccion): void {
    this.borrar.emit(coleccion);
  }

  refresh(): void {
    this.coleccionesService.listarColecciones().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  private cargarListadoColecciones(): void {
    this.coleccionesService.listarColecciones().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
