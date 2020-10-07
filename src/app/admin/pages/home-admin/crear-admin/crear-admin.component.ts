import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Admin } from 'src/app/admin/models/admin';
import { ListadoDeAdminInactivos } from 'src/app/admin/models/adminsInactivos';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'app-crear-admin',
  templateUrl: './crear-admin.component.html',
  styleUrls: ['./crear-admin.component.scss']
})
export class CrearAdminComponent implements OnInit {

  @Input() display: boolean;
  @Output() cerrarDialogo = new EventEmitter<void>();
  ventasDiarias = [];
  ventasMensuales = [];
  listaAdmin: Admin[] = [];
  listadoDeAdminInactivos: ListadoDeAdminInactivos[] = [];
  formularioAdmin: FormGroup;
  submitted = false;
  id = null;


  totalVentasDiarias: number;
  totalVentasMensuales: number;
  totalAdmin: string;

  constructor(private adminService: AdminService, fb: FormBuilder, private messageService: MessageService) {
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
    if (value) {
      this.adminService.crearAdmin(value).subscribe(datos => {
        if (datos){
          this.messageService.add({severity: 'success', summary: 'Administrador', detail: 'Admin creado correctamente.'});
          this.cerrarDialogo.emit();
        }
        else{
          this.messageService.add({severity: 'error', summary: 'Administrador', detail: 'Hubo un problema al crear el administrador.'});
        }
      });
    }

  }
  private elFormularioAdmin(fb: FormBuilder): void {
    this.formularioAdmin = fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(145)]],
      apellidos: ['', [Validators.required, Validators.maxLength(145)]],
      email: ['', [Validators.required, Validators.maxLength(145)]],
      password: ['',  [Validators.required, Validators.maxLength(16)]],
      deleted: [0]
    });
  }
  get f(): any { return this.formularioAdmin.controls; }
}

