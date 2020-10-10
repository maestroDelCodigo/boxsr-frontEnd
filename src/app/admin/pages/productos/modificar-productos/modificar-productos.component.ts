import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/admin/core/productos.service';
import { Producto } from 'src/app/admin/models/producto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modificar-productos',
  templateUrl: './modificar-productos.component.html',
  styleUrls: ['./modificar-productos.component.scss']
})
export class ModificarProductosComponent implements OnInit {
  @Input() producto: Producto;
  @Input() display: boolean;
  @Output() cerrarDialogo = new EventEmitter<void>();
  productosForm: FormGroup;
  submitted = false;

  constructor(private productosService: ProductosService, private formBuilder: FormBuilder,
              private messageService: MessageService ) { }

  ngOnInit(): void {

    this.productosForm = this.formBuilder.group({
      nombre: [ this.producto.nombre, [Validators.required, Validators.maxLength(145)]],
      tipo: [this.producto.tipo_producto, [Validators.required, Validators.maxLength(145)]],
      codigo: [this.producto.codigo_producto, [Validators.required, Validators.maxLength(30)]],
      peso: [this.producto.peso, [Validators.required, Validators.maxLength(10)]],
      stock: [this.producto.stock, [Validators.required, Validators.maxLength(10)]],
      precio: [this.producto.precio, [Validators.required, Validators.maxLength(10)]],
  });
  }

  get f(): any { return this.productosForm.controls; }

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
    this.producto.stock = this.f.stock.value;
    this.producto.precio = this.f.precio.value;
    this.producto.deleted = 0;
    this.producto.fecha_creacion = this.producto.fecha_creacion;

    // Llamada al servicio que llama al back
    this.productosService.modificarProducto(this.producto).subscribe(
      (resultado) => {
        console.log(resultado);
        if (resultado){
          this.messageService.add({severity: 'success', summary: 'Producto', detail: 'Producto modificado correctamente.'});
          this.cerrarDialogo.emit();
        }
        else{
          this.messageService.add({severity: 'error', summary: 'Producto', detail: 'Hubo un problema al modificar el producto.'});
        }
      },
    );
  }

}

