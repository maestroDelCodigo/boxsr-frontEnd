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

  guardar(): void {
    this.submitted = true;

    if (this.formContact.invalid) {
      console.log('ha llegado')
      return this.messageService.add({
        severity: 'error',
        summary: 'Contacto',
        detail: 'Hubo un problema al crear el mesaje',
      });
    } 

    const contacto = new Contacto();

    contacto.nombre = this.f.nombre.value;
    contacto.apellidos = this.f.apellidos.value;
    contacto.email = this.f.email.value;
    contacto.mensaje = this.f.mensaje.value;
    contacto.fecha = this.f.fecha.value;
    contacto.fecha_creacion=this.f.fecha.value;


    this.contactoService.cargarMensaje(contacto).subscribe(
      (resultado) => {
        console.log(resultado)
        if(resultado){
          this.messageService.add({severity: 'success', summary: 'Contacto', detail: 'Mensaje enviado correctamente'});
        }
        else{
          this.messageService.add({severity: 'error', summary: 'Contacto', detail: 'Hubo un problema al enviar el mensaje'});
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
