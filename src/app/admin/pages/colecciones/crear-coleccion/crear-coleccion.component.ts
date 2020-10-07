import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { ColeccionesService } from 'src/app/admin/core/colecciones.service';
import { ProductosService } from 'src/app/admin/core/productos.service';
import { Coleccion } from 'src/app/admin/models/Coleccion';

@Component({
  selector: 'app-crear-coleccion',
  templateUrl: './crear-coleccion.component.html',
  styleUrls: ['./crear-coleccion.component.scss']
})
export class CrearColeccionComponent implements OnInit {
  @Input() display: boolean;
  @Output() cerrarDialogo = new EventEmitter<void>();
  coleccionesForm: FormGroup;
  submitted = false;
  displayedColumns: string[] = ['nombre', 'precio', 'tipo', 'seleccionado'];
  dataSource = null;
  precioTotal = 0;
  productosSeleccionados: number[] = [];

  constructor(private coleccionesService: ColeccionesService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private productosService: ProductosService ) { }

  ngOnInit(): void {
    this.coleccionesForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(145)]],
      video_url: ['', [Validators.maxLength(145)]],
      precio_rebajado: ['', [ Validators.maxLength(10)]],
      precio_original: ['', [Validators.required, Validators.maxLength(10)]],
  });

    // Pintamos la tabla de productos
    this.productosService.listarProductos().subscribe(
      (productos) => {
        const data = productos.map((producto) => {
          return {
            id: producto.producto_id,
            nombre : producto.nombre,
            precio : producto.precio,
            tipo : producto.tipo_producto,
            seleccionado : false
          };
        });

        this.dataSource = new MatTableDataSource(data);
      }
    );

  }

  get f(): any { return this.coleccionesForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.coleccionesForm.invalid) {
        return;
    }

    const coleccion = new Coleccion();
    coleccion.nombre = this.f.nombre.value;
    coleccion.video_url = this.f.video_url.value;
    coleccion.precio_rebajado = !this.f.precio_rebajado.value ? 0 : this.f.precio_rebajado.value ;
    coleccion.precio_original = this.f.precio_original.value;
    coleccion.deleted = 0;
    coleccion.productos_asociados = this.productosSeleccionados;

    // Llamada al servicio que llama al back
    this.coleccionesService.crearColeccion(coleccion).subscribe(
      (resultado) => {
        if(resultado){
          this.messageService.add({severity: 'success', summary: 'Coleccion', detail: 'Coleccion creada correctamente.'});
          this.cerrarDialogo.emit();
        }
        else{
          this.messageService.add({severity: 'error', summary: 'Coleccion', detail: 'Hubo un problema al crear coleccion.'});
        }
      },
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  calcularTotal(data : MatCheckboxChange, precio: number, id: number) : void{

    if(data.checked)
    {
      this.precioTotal = this.precioTotal + precio;
      this.productosSeleccionados.push(id);
    }
    else{
      this.precioTotal = this.precioTotal - precio;
      const index = this.productosSeleccionados.indexOf(id, 0);
      if (index > -1) {
        this.productosSeleccionados.splice(index, 1);
      }
    }

    this.f.precio_original.setValue(this.precioTotal);
  }

}



