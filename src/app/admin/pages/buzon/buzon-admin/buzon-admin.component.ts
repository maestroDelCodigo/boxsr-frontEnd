import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContactoService } from '../../../../services/contacto.service';

@Component({
  selector: 'app-buzon-admin',
  templateUrl: './buzon-admin.component.html',
  styleUrls: ['./buzon-admin.component.scss'],
})
export class BuzonAdminComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellidos', 'email', 'mensaje'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private contactoService: ContactoService) {}

  ngOnInit(): void {
    this.cargarListadoMensajes();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private cargarListadoMensajes(): void {
    this.contactoService.verMensajes().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
