import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../../models/admin';
import { ListadoDeAdminInactivos } from '../../models/adminsInactivos';
import { AdminRol } from '../../models/enums/rol.enum';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  @Input() display: boolean;
  @Output() cerrarDialogo = new EventEmitter<void>();
  ventasDiarias = [];
  ventasMensuales = [];
  listaAdmin: Admin[] = [];
  listadoDeAdminInactivos: ListadoDeAdminInactivos[] = [];
  roles: AdminRol[] = [];
  formularioAdmin: FormGroup;
  submitted = false;
  id = null;
  admins: Admin[] = [];
  adminsInactivos: ListadoDeAdminInactivos[] = [];
  mostrarCrearAdmin = false;
  mostrarModificarAdmins = false;

  totalVentasDiarias: number;
  totalVentasMensuales: number;
  totalAdmin: string;
  adminModificar: Admin = null;

  constructor(private adminService: AdminService, fb: FormBuilder, private messageService: MessageService) {
    // this.elFormularioAdmin(fb);
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
        this.totalVentasDiarias = this.ventasDiarias.map(venta => venta.total_pedido).reduce((acc, venta) => acc + venta);

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
        this.totalVentasMensuales = this.ventasMensuales.map(venta => venta.total_pedido).reduce((acc, venta) => acc + venta);

      }
    });
  }

  guardar(value: any): void {
    this.submitted = true;
    console.log(value);
    if (value) {
      this.adminService.crearAdmin(value).subscribe(datos => {
        if (datos) {
          this.messageService.add({ severity: 'success', summary: 'Administrador', detail: 'Admin creado correctamente.' });
          this.cerrarDialogo.emit();
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Administrador', detail: 'Hubo un problema al crear el administrador.' });
        }
      });
      this.listarAdmin();
    }

 }
modificarAdmin(admin: Admin): void{
  this.adminModificar = admin;
  console.log(admin.usuario_id);
  console.log(this.adminModificar);
  this.mostrarModificarAdmins = true;

}
borrarProducto(id: number){
  this.adminService.descatalogarAdmin(id, 1).subscribe(
    () => this.list.refresh()
  );

 }

onOcultarModificarAdmins(): void {
    this.mostrarModificarAdmins = false;
  }
  onMostrarCrearAdmin(): void{
    this.mostrarCrearAdmin = true;
  }

  onOcultarCrearAdmin(): void{
    this.mostrarCrearAdmin = false;
  }
}
