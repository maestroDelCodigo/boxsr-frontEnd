import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ColeccionesService } from 'src/app/admin/core/colecciones.service';
import { Coleccion } from 'src/app/admin/models/Coleccion';

@Component({
  selector: 'app-modificar-coleccion',
  templateUrl: './modificar-coleccion.component.html',
  styleUrls: ['./modificar-coleccion.component.scss']
})
export class ModificarColeccionComponent implements OnInit {
  @Input() coleccion: Coleccion;
  @Input() display: boolean;
  @Output() cerrarDialogo = new EventEmitter<void>();
  coleccionesForm: FormGroup;
  submitted = false;

  constructor(private coleccionesService: ColeccionesService,
              private formBuilder: FormBuilder,
              private messageService: MessageService ) { }

  ngOnInit(): void {
    this.coleccionesForm = this.formBuilder.group({
      nombre: [this.coleccion.nombre, [Validators.required, Validators.maxLength(145)]],
      video_url: [this.coleccion.video_url, [Validators.maxLength(145)]],
      precio_rebajado: [this.coleccion.precio_rebajado, [ Validators.maxLength(10)]],
      precio_original: [this.coleccion.precio_original, [Validators.required, Validators.maxLength(10)]],
  });
  }

  get f(): any { return this.coleccionesForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.coleccionesForm.invalid) {
        return;
    }

    this.coleccion.nombre = this.f.nombre.value;
    this.coleccion.video_url = this.f.video_url.value;
    this.coleccion.precio_rebajado = this.f.precio_rebajado.value;
    this.coleccion.precio_original = this.f.precio_original.value;

    // Llamada al servicio que llama al back
    this.coleccionesService.modificarColeccion(this.coleccion).subscribe(
      (resultado) => {
        console.log(resultado);
        if(resultado){
          this.messageService.add({severity: 'success', summary: 'Coleccion', detail: 'Coleccion modificado correctamente.'});
          this.cerrarDialogo.emit();
        }
        else{
          this.messageService.add({severity: 'error', summary: 'Coleccion', detail: 'Hubo un problema al modificar el coleccion.'});
        }
      },
    );
  }
  }


