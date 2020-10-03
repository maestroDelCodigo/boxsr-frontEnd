import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  ventasDiarias = [];
  ventasMensuales = [];
  listaAdmin = [];

  totalVentasDiarias: number;
  totalVentasMensuales: number;
  totalAdmin: string;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.calcularVentasDiarias(); this.calcularVentasMensuales(); this.listarAdmin();
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
  listarAdmin(): void {
    this.adminService.listaAdmin().subscribe(datos => {
      this.listaAdmin = datos;
      console.log(datos)
    });
  }

}
