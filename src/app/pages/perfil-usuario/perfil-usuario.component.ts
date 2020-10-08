import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
formularioUsuario: FormGroup;
submitted = false;
  constructor(fb: FormBuilder, private messageService: MessageService) {
    this.elformularioUsuario(fb)
   }

  ngOnInit() {
  }
  private elformularioUsuario(fb: FormBuilder): void {
    this.formularioUsuario = fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(60)]],
      apellidos: ['', [Validators.required, Validators.maxLength(145)]],
      email: ['', [Validators.required, Validators.maxLength(80)]],
      password: ['',  [Validators.required, Validators.maxLength(15)]],
      deleted: [0]
    });
  }
  get f(): any { return this.formularioUsuario.controls; }
}
