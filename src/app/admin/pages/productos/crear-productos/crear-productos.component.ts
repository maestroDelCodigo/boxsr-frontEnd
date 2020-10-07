import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/admin/core/productos.service';
import { Producto } from 'src/app/admin/models/producto';
import { MessageService } from 'primeng/api';
import { UploadFilesService } from 'src/app/core/upload.service';
import { first, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.scss']
})
export class CrearProductosComponent implements OnInit {
  @ViewChild('fileInput') el: ElementRef;
  @Input() display: boolean;
  @Output() cerrarDialogo = new EventEmitter<void>();
  imageUrl: any = '';
  productosForm: FormGroup;
  submitted = false;
  editFile = true;
  removeUpload = false;
  nombreImagen: string;
  file: any;

  constructor(private productosService: ProductosService, private formBuilder: FormBuilder,
              private messageService: MessageService, private cd: ChangeDetectorRef, private uploadService: UploadFilesService ) { }

  ngOnInit(): void {

    this.productosForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(145)]],
      tipo: ['', [Validators.required, Validators.maxLength(145)]],
      codigo: ['', [Validators.required, Validators.maxLength(30)]],
      peso: ['', [Validators.required, Validators.maxLength(10)]],
      stock: ['', [Validators.required, Validators.maxLength(10)]],
      precio: ['', [Validators.required, Validators.maxLength(10)]],
  });
  }

  get f(): any { return this.productosForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productosForm.invalid) {
        return;
    }

    const producto = new Producto();
    producto.nombre = this.f.nombre.value;
    producto.tipo_producto = this.f.tipo.value;
    producto.codigo_producto = this.f.codigo.value;
    producto.peso = this.f.peso.value;
    producto.stock = this.f.stock.value;
    producto.precio = this.f.precio.value;
    producto.deleted = 0;
    producto.fecha_creacion = new Date().toISOString().slice(0, 19).replace('T', ' ');


    // Subimos la imagen

    if (this.file)
    {
      producto.nombre_imagen = this.nombreImagen;

      this.uploadService.upload(this.file).pipe(
        first(),
        switchMap(() => this.productosService.crearProducto(producto))
        ).subscribe(
          (resultado) => {
            if(resultado){
              this.messageService.add({severity: 'success', summary: 'Producto', detail: 'Producto creado correctamente.'});
              this.cerrarDialogo.emit();
            }
            else{
              this.messageService.add({severity: 'error', summary: 'Producto', detail: 'Hubo un problema al crear el producto.'});
            }
          },
        );

    }else {
      producto.nombre_imagen = '';
      // Llamada al servicio que llama al back
      this.productosService.crearProducto(producto).subscribe(
        (resultado) => {
          if(resultado){
            this.messageService.add({severity: 'success', summary: 'Producto', detail: 'Producto creado correctamente.'});
            this.cerrarDialogo.emit();
          }
          else{
            this.messageService.add({severity: 'error', summary: 'Producto', detail: 'Hubo un problema al crear el producto.'});
          }
        },
      );
    }
  }

  uploadImageServer(file): void {

    this.uploadService.upload(file).pipe(first()).subscribe(
      event => {
        this.messageService.add({severity: 'success', summary: 'Upload', detail: 'Fichero subido'});
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Upload', detail: 'Error subiendo fichero'});
      });
  }


  uploadFile(event): void{
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
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

    // Function to remove uploaded file
    removeUploadedFile() : void {
      const newFileList = Array.from(this.el.nativeElement.files);
      this.imageUrl = '';
      this.editFile = true;
      this.removeUpload = false;
      // this.registrationForm.patchValue({
      //   file: [null]
      // });
    }

}