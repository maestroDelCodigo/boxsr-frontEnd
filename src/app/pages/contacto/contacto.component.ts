
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  formContact: FormGroup;
  submitted = false;

  constructor( private messageService:MessageService, fb: FormBuilder) { 
    this.formularioContacto (fb);
  }

  ngOnInit(): void {
  }

guardar(value: any): void {

    this.submitted = true;

    if (this.formContact.invalid) {
      return this.messageService.add({ severity: 'error', summary: 'Registro',detail:'Hubo un problema al enviar el mensaje' });
  }else{
    this.messageService.add({ severity: 'success', summary: 'Registro', detail: 'El email se ha enviado correctamente' });
  }
      }

  private formularioContacto(fb: FormBuilder): void {
    this.formContact = fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(145)]],
      apellidos: ['', [Validators.required, Validators.maxLength(145)]],
      email: ['', [Validators.required, Validators.maxLength(145)]],
      mensaje: ['', [Validators.required, Validators.maxLength(300)]],
     
    });
  }
  get f(): any { return this.formContact.controls; }

}
