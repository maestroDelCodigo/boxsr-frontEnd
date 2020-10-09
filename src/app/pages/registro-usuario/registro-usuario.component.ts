import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/models/usuario';
import { RegistroUsuarioService } from 'src/app/services/registro-usuario.service';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent implements OnInit {
  formularioUsuario: FormGroup;
  submitted = false;
  hide = true;
  startDate = new Date(1990, 0, 1);
  constructor(fb: FormBuilder, private messageService: MessageService, private registroService: RegistroUsuarioService) {
    this.elformularioUsuario(fb);
  }

  ngOnInit(): void {
  }

  guardar(value: Usuario): void {
    this.submitted = true;
    if (this.formularioUsuario.invalid) {
      return this.messageService.add({ severity: 'error', summary: 'Registro', detail: 'Hubo un problema al hacer el registro' });;
  }
    if (value) {
      this.registroService.crearUsuario(value).subscribe(datos => {
        if (datos) {
          this.messageService.add({ severity: 'success', summary: 'Registro', detail: 'Te has registrado correctamente' });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Registro', detail: 'Hubo un problema al hacer el registro' });
        }
      });
    }
  }








  private elformularioUsuario(fb: FormBuilder): void {
    this.formularioUsuario = fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(60)]],
      apellidos: ['', [Validators.required, Validators.maxLength(145)]],
      fecha_nacimiento: ['', [Validators.required, Validators.maxLength(145)]],
      email: ['', [Validators.required, Validators.maxLength(80)]],
      password: ['', [Validators.required, Validators.maxLength(15)]],
      direccion: ['', [Validators.required, Validators.maxLength(145)]],
      codigo_postal: ['', [Validators.required, Validators.maxLength(5)]],
      poblacion: ['', [Validators.required, Validators.maxLength(60)]],
      deleted: [0]
    });
  }
  get f(): any { return this.formularioUsuario.controls; }
}

