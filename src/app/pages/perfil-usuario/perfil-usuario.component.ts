import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/models/usuario';
import { RegistroUsuarioService } from 'src/app/services/registro-usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  usuario: Usuario;
  formularioUsuario: FormGroup;
  submitted = false;
  hide = true;
  messageError = null;
  startDate = new Date(1990, 0, 1);
  id = null;
  constructor(private fb: FormBuilder, private messageService: MessageService,
              public registroService: RegistroUsuarioService,
              activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((x) => {
      this.id = x?.id || null;
    });
    this.elformularioUsuario(fb);
  }

  ngOnInit(): void {
    this.registroService.getUser(this.id).subscribe(x => {
      this.usuario = x;
      this.formularioUsuario = this.fb.group({
        nombre: [this.usuario.nombre, [Validators.required, Validators.maxLength(145)]],
        apellidos: [this.usuario.apellidos, [Validators.required, Validators.maxLength(145)]],
        email: [this.usuario.email, [Validators.required, Validators.maxLength(145)]],
        password: [this.usuario.password, [Validators.required, Validators.maxLength(16)]],
        fecha_nacimiento: [this.usuario.fecha_nacimiento, [Validators.required, Validators.maxLength(60)]],
        direccion: [this.usuario.direccion, [Validators.required, Validators.maxLength(145)]],
        codigo_postal: [this.usuario.codigo_postal, [Validators.required, Validators.maxLength(5)]],
        poblacion: [this.usuario.poblacion, [Validators.required, Validators.maxLength(60)]],
        provincia: [this.usuario.provincia, [Validators.required, Validators.maxLength(60)]],
        deleted: [0],
      });
    });
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.formularioUsuario.invalid) {
      return  this.messageService.add({ severity: 'error', summary: 'Administrador', detail: 'Los datos no son válidos' });
    }

    this.usuario.nombre = this.f.nombre.value;
    this.usuario.apellidos = this.f.apellidos.value;
    this.usuario.email = this.f.email.value;
    this.usuario.fecha_nacimiento = this.f.fecha_nacimiento.value;
    this.usuario.direccion = this.f.direccion.value;
    this.usuario.codigo_postal = this.f.codigo_postal.value;
    this.usuario.poblacion = this.f.poblacion.value;
    this.usuario.provincia = this.f.provincia.value;



    this.registroService.modificarUsuario(this.usuario, this.id).subscribe(resultado => {
        if (resultado) {
          this.messageService.add({ severity: 'success', summary: 'Todo OK', detail: 'Tus datos se han modificado correctamente.' });
        }
        else {
          this.messageService.add({
            severity: 'error', summary: 'Error',
            detail: 'Hubo un problema al modificar tu perfil.'
          });
        }
      });
 }


  private elformularioUsuario(fb: FormBuilder): void {
    this.formularioUsuario = fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(60)]],
      apellidos: ['', [Validators.required, Validators.maxLength(145)]],
      fecha_nacimiento: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.maxLength(80)]],
      password: ['', [Validators.required, Validators.maxLength(15)]],
      direccion: ['', [Validators.required, Validators.maxLength(145)]],
      codigo_postal: ['', [Validators.required, Validators.maxLength(5)]],
      poblacion: ['', [Validators.required, Validators.maxLength(60)]],
      provincia: ['', [Validators.required, Validators.maxLength(60)]],
      deleted: [0]
    });
  }
  get f(): any { return this.formularioUsuario.controls; }
}
