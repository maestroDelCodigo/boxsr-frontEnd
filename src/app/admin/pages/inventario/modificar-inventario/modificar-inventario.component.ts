import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductosService } from 'src/app/admin/core/productos.service';
import { Producto } from 'src/app/admin/models/producto';

@Component({
  selector: 'app-modificar-inventario',
  templateUrl: './modificar-inventario.component.html',
  styleUrls: ['./modificar-inventario.component.scss']
})
export class ModificarInventarioComponent implements OnInit {
  @Input() producto: Producto;
  @Input() display: boolean;
  @Output() cerrarDialogo = new EventEmitter<void>();
  inventarioForm: FormGroup;
  submitted = false;

  constructor(private productosService: ProductosService, private formBuilder: FormBuilder,  private messageService: MessageService) { }

  ngOnInit(): void {
    this.inventarioForm = this.formBuilder.group({
      stock: [this.producto.stock, [Validators.required, Validators.maxLength(10)]],
    });

  }

  get f(): any { return this.inventarioForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.inventarioForm.invalid) {
        return;
    }

    this.producto.stock = this.f.stock.value;

    this.productosService.modificarProducto(this.producto)
        .subscribe(
          (resultado) => {
            if (resultado){
              this.messageService.add({severity: 'success', summary: 'Inventario', detail: 'Stock modificado correctamente.'});
              this.cerrarDialogo.emit();
            }
            else{
              this.messageService.add({severity: 'error', summary: 'Inventario', detail: 'Hubo un problema al modificar el stock.'});
            }
          },
        );
  }

}
