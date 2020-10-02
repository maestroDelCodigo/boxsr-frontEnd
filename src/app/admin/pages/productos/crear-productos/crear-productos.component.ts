import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/admin/core/productos.service';
import { Producto } from 'src/app/admin/models/producto';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.scss']
})
export class CrearProductosComponent implements OnInit {
  @Input() display: boolean;
  @Output() cerrarDialogo = new EventEmitter<void>();
  productosForm: FormGroup;
  submitted = false;

  constructor(private productosService: ProductosService,   private formBuilder: FormBuilder,) { }

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

    // Llamada al servicio que llama al back
    this.productosService.crearProducto(producto).subscribe(

      // TODO: crear logica de ok o error
    );
  }

}
