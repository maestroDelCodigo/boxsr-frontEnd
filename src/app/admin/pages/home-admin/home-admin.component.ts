import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListadoDeAdmin } from '../../models/admin';
import { ListadoDeAdminInactivos } from '../../models/adminsInactivos'
import { AdminRol } from '../../models/enums/rol.enum';
import { IdName } from '../../models/id-name';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  // @Input() admins: ListadoDeAdmin[] = [];
  // @Input() adminInactivos: ListadoDeAdminInactivos[] = [];
  ventasDiarias = [];
  ventasMensuales = [];
  listaAdmin: ListadoDeAdmin[] = [];
  listadoDeAdminInactivos: ListadoDeAdminInactivos[] = []
  roles: AdminRol[] = [];
  formularioAdmin: FormGroup;
  submited = false;
  id = null;


  totalVentasDiarias: number;
  totalVentasMensuales: number;
  totalAdmin: string;

  constructor(private adminService: AdminService, fb: FormBuilder) {
    this.elFormularioAdmin(fb);
  }

  ngOnInit(): void {
    this.calcularVentasDiarias(); this.calcularVentasMensuales();
    this.listarAdmin(); this.listarAdminInactivos();
  }



  listarAdmin(): void {
    this.adminService.listaAdminActivos().subscribe(x => {
      this.listaAdmin = x;
    });

  }

  listarAdminInactivos(): void {
    this.adminService.listaAdminInactivos().subscribe(x => {
      this.listadoDeAdminInactivos = x;
    });

  }

  calcularVentasDiarias(): void {
    this.adminService.ventasDiarias().subscribe(datos => {
      this.ventasDiarias = datos;
      if (this.ventasDiarias.length === 0) {
        this.totalVentasDiarias = 0;
      }
      else {
        this.ventasDiarias = datos;
        this.totalVentasDiarias = this.ventasDiarias.map(venta => venta.total_pedido).reduce((acc, venta) => acc + venta)

      }
    });
  }
  calcularVentasMensuales(): void {
    this.adminService.ventasMensuales().subscribe(datos => {
      this.ventasMensuales = datos;
      if (this.ventasMensuales.length === 0) {
        this.totalVentasMensuales = 0;
      }
      else {
        this.ventasMensuales = datos;
        this.totalVentasMensuales = this.ventasMensuales.map(venta => venta.total_pedido).reduce((acc, venta) => acc + venta)

      }
    });
  }

  private elFormularioAdmin(fb: FormBuilder): void {
    this.formularioAdmin = fb.group({
      id: [''],
      nombre: [''],
      apellidos: [''],
      email: [''],
      deleted: ['']
    });
  }
}
