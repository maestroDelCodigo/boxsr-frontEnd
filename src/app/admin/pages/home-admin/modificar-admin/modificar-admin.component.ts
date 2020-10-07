import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Admin } from 'src/app/admin/models/admin';
import { ListadoDeAdminInactivos } from 'src/app/admin/models/adminsInactivos';
import { AdminService } from 'src/app/admin/services/admin.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs';
import { first, tap } from 'rxjs/operators';

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
  displayedColumns: string[] = ['nombre', 'apellidos', 'email', 'password', 'actions', 'deleted'];
  dataSource = null;
  formularioAdmin: FormGroup;
  submitted = false;
  id = null;
  constructor(private adminService: AdminService,
              private formBuilder: FormBuilder,
              private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.formularioAdmin = this.formBuilder.group({
      nombre: [this.admin.nombre, [Validators.required, Validators.maxLength(145)]],
      apellidos: [this.admin.apellidos, [Validators.required, Validators.maxLength(145)]],
      email: [this.admin.email, [Validators.required, Validators.maxLength(145)]],
      password: [this.admin.password, [Validators.required, Validators.maxLength(16)]],
    });
  }
  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.formularioAdmin.invalid) {
      return;
    }




    this.admin.nombre = this.f.nombre.value;
    this.admin.apellidos = this.f.apellidos.value;
    this.admin.email = this.f.email.value;
    this.admin.password = this.f.password.value;

    this.adminService.modificarAdmin(this.admin).subscribe(
      (resultado) => {
        if (resultado) {
          this.messageService.add({ severity: 'success', summary: 'Administrador', detail: 'Administrador modificado correctamente.' });
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
  get f(): any { return this.formularioAdmin.controls; }
}
