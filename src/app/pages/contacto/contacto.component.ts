import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Contacto } from 'src/app/models/contacto';
import { ContactoService } from '../../core/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent implements OnInit {
  formContact: FormGroup;
  submitted = false;

  constructor(private messageService: MessageService, fb: FormBuilder, private contactoService: ContactoService) {
    this.formularioContacto(fb);
  }

  ngOnInit(): void {}

  guardar(value: any): void {
    this.submitted = true;

    if (this.formContact.invalid) {
      return this.messageService.add({
        severity: 'error',
        summary: 'Registro',
        detail: 'Hubo un problema al enviar el mensaje',
      });
    } 

    const contacto = new Contacto();

        contacto.nombre = this.f.nombre.value;
    contacto.apellidos = this.f.apellidos.value;
        contacto.email = this.f.email.value;
        contacto.mensaje = this.f.mensaje.mensaje;


    this.contactoService.cargarMensaje(contacto).subscribe(
      (resultado) => {
        if(resultado){
          this.messageService.add({severity: 'success', summary: 'Contacto', detail: 'Coleccion creada correctamente.'});
          
        }
        else{
          this.messageService.add({severity: 'error', summary: 'Contacto', detail: 'Hubo un problema al crear coleccion.'});
        }
      },
    );
  }

  private formularioContacto(fb: FormBuilder): void {
    this.formContact = fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(145)]],
      apellidos: ['', [Validators.required, Validators.maxLength(145)]],
      email: ['', [Validators.required, Validators.maxLength(145)]],
      mensaje: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }
  get f(): any {
    return this.formContact.controls;
  }
}
