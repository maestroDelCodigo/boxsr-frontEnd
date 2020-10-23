import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/admin/services/productos.service';
import { Producto } from 'src/app/models/producto';
import { MessageService } from 'primeng/api';
import { UploadFilesService } from 'src/app/core/upload.service';
import { first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-modificar-productos',
  templateUrl: './modificar-productos.component.html',
  styleUrls: ['./modificar-productos.component.scss'],
})
export class ModificarProductosComponent implements OnInit {
  @ViewChild('fileInput') el: ElementRef;
  @Input() producto: Producto;
  @Input() display: boolean;
  @Output() cerrarDialogo = new EventEmitter<void>();
  imageUrl: any = '';
  productosForm: FormGroup;
  submitted = false;
  editFile = true;
  removeUpload = false;
  nombreImagen: string;
  file: any;

  constructor(
    private productosService: ProductosService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private cd: ChangeDetectorRef,
    private uploadService: UploadFilesService
  ) {}

  ngOnInit(): void {
    this.productosForm = this.formBuilder.group({
      nombre: [
        this.producto.nombre,
        [Validators.required, Validators.maxLength(145)],
      ],
      tipo: [
        this.producto.tipo_producto,
        [Validators.required, Validators.maxLength(145)],
      ],
      codigo: [
        this.producto.codigo_producto,
        [Validators.required, Validators.maxLength(30)],
      ],
      peso: [
        this.producto.peso,
        [Validators.required, Validators.maxLength(6)],
      ],
      precio: [
        this.producto.precio,
        [Validators.required, Validators.maxLength(5)],
      ],
      descripcion: [
        this.producto.descripcion,
        [Validators.required, Validators.maxLength(500)],
      ],
      resumen: [
        this.producto.descripcion_resumen,
        [Validators.required, Validators.maxLength(500)],
      ],
      utilidad: [
        this.producto.descripcion_sirve,
        [Validators.required, Validators.maxLength(500)],
      ],
      usabilidad: [
        this.producto.descripcion_usa,
        [Validators.required, Validators.maxLength(500)],
      ],
      ingredientes: [
        this.producto.descripcion_ingredientes,
        [Validators.required, Validators.maxLength(500)],
      ],
    });

    this.imageUrl = this.producto.imagen_url;

    if (this.imageUrl) {
      this.editFile = false;
      this.removeUpload = true;
    }
  }

  get f(): any {
    return this.productosForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productosForm.invalid) {
      return;
    }

    this.producto.nombre = this.f.nombre.value;
    this.producto.tipo_producto = this.f.tipo.value;
    this.producto.codigo_producto = this.f.codigo.value;
    this.producto.peso = this.f.peso.value;
    this.producto.precio = this.f.precio.value;
    this.producto.deleted = 0;
    this.producto.fecha_creacion = this.producto.fecha_creacion;
    this.producto.descripcion = this.f.descripcion.value;
    this.producto.descripcion_resumen = this.f.resumen.value;
    this.producto.descripcion_sirve = this.f.utilidad.value;
    this.producto.descripcion_usa = this.f.usabilidad.value;
    this.producto.descripcion_ingredientes = this.f.ingredientes.value;

    if (this.file) {
      this.producto.nombre_imagen = this.nombreImagen;

      this.uploadService
        .upload(this.file)
        .pipe(
          first(),
          switchMap(() =>
            this.productosService.modificarProducto(this.producto)
          )
        )
        .subscribe((resultado) => {
          if (resultado) {
            this.messageService.add({
              severity: 'success',
              summary: 'Producto',
              detail: 'Producto modificar correctamente.',
            });
            this.cerrarDialogo.emit();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Producto',
              detail: 'Hubo un problema al modificar el producto.',
            });
          }
        });
    } else {
      if (!this.imageUrl) {
        this.producto.nombre_imagen = '';
      }

      // Llamada al servicio que llama al back
      this.productosService
        .modificarProducto(this.producto)
        .subscribe((resultado) => {
          if (resultado) {
            this.messageService.add({
              severity: 'success',
              summary: 'Producto',
              detail: 'Producto modificado correctamente.',
            });
            this.cerrarDialogo.emit();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Producto',
              detail: 'Hubo un problema al modificar el producto.',
            });
          }
        });
    }
  }

  uploadFile(event): void {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      this.nombreImagen = event.target.files[0].name;
      this.file = event.target.files[0];
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        // this.registrationForm.patchValue({
        //   file: reader.result
        // });
        this.editFile = false;
        this.removeUpload = true;
      };
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

  // Function to remove uploaded file
  removeUploadedFile(): void {
    const newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = '';
    this.editFile = true;
    this.removeUpload = false;
    // this.registrationForm.patchValue({
    //   file: [null]
    // });
  }
}
