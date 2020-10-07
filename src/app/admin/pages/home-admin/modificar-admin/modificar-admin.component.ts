import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Admin } from 'src/app/admin/models/admin';
import { ListadoDeAdminInactivos } from 'src/app/admin/models/adminsInactivos';
import { AdminService } from 'src/app/admin/services/admin.service';


@Component({
  selector: 'app-modificar-admin',
  templateUrl: './modificar-admin.component.html',
  styleUrls: ['./modificar-admin.component.scss']
})
export class ModificarAdminComponent implements OnInit {

  @Input() display: boolean;
  @Input() admin: Admin;
  @Output() cerrarDialogo = new EventEmitter<void>();
  listaAdmin: Admin[] = [];
  listadoDeAdminInactivos: ListadoDeAdminInactivos[] = [];
  formularioAdmin: FormGroup;
  submitted = false;
  id = null;
  private adminId: any;
  constructor(private adminService: AdminService, fb: FormBuilder, private messageService: MessageService, activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(x => {
      console.log(x);
      this.adminId = x?.usuario_id || null;
      console.log(this.adminId)
    });
    this.elFormularioAdmin(fb);

  }

  ngOnInit(): void {
    console.log(this.adminId);
    if (this.adminId) {
      this.adminService.getAdmin(this.adminId).subscribe(x => {
        console.log(x);
        if (x) {
          this.formularioAdmin.patchValue(x);

        }
      });
    }
  }

  modificar(): void {
    this.submitted = true;
    this.adminService.modificarAdmin(this.admin).subscribe(
      (resultado) => {
        if (resultado) {
          this.messageService.add({ severity: 'success', summary: 'Administrador', detail: 'Producto modificado correctamente.' });
          this.cerrarDialogo.emit();
        }
        else {
          this.messageService.add({
            severity: 'error', summary: 'Administrador',
            detail: 'Hubo un problema al modificar el administrador.'
          });
        }
      });
  }

  private elFormularioAdmin(fb: FormBuilder): void {
    this.formularioAdmin = fb.group({
      id: [''],
      nombre: ['', [Validators.required, Validators.maxLength(145)]],
      apellidos: ['', [Validators.required, Validators.maxLength(145)]],
      email: ['', [Validators.required, Validators.maxLength(145)]],
      password: ['', [Validators.required, Validators.maxLength(16)]],
    });
  }
  get f(): any { return this.formularioAdmin.controls; }
}
