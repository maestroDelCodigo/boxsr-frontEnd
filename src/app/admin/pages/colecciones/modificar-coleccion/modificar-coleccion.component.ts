import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { ColeccionesService } from 'src/app/admin/core/colecciones.service';
import { ProductosService } from 'src/app/admin/core/productos.service';
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
  displayedColumns: string[] = ['nombre', 'precio', 'tipo', 'seleccionado'];
  dataSource = null;
  precioTotal = 0;
  productosSeleccionados: number[] = [];

  constructor(private coleccionesService: ColeccionesService,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private productosService: ProductosService  ) { }

  ngOnInit(): void {
    this.coleccionesForm = this.formBuilder.group({
      nombre: [this.coleccion.nombre, [Validators.required, Validators.maxLength(145)]],
      video_url: [this.coleccion.video_url, [Validators.maxLength(145)]],
      precio_rebajado: [this.coleccion.precio_rebajado, [ Validators.maxLength(10)]],
      precio_original: [this.coleccion.precio_original, [Validators.required, Validators.maxLength(10)]],
    });

    combineLatest( [this.productosService.listarProductos(),
      this.coleccionesService.obtenerProductosAsociados(this.coleccion.coleccion_id)])
      .pipe(
        first(),
        tap(([productos, productosAsociados]) => {
          const data = productos.map((producto) => {
            return {
              id: producto.producto_id,
              nombre : producto.nombre,
              precio : producto.precio,
              tipo : producto.tipo_producto,
              seleccionado : this.estaAsociado(producto.producto_id, productosAsociados, this.coleccion.coleccion_id)
            };
          });

          this.dataSource = new MatTableDataSource(data);
        })
        ).subscribe();
  }

  private estaAsociado(id: number, productos: any[], idColeccion: number): boolean{
    const existe = productos.find((producto) => producto.producto_id === id && producto.coleccion_id === idColeccion);

    if (existe){
      return true;
    }

    return false;

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

    // TODO: Enviar el id e los productos seleccionados

    console.log(this.productosSeleccionados);

    // Llamada al servicio que llama al back
    this.coleccionesService.modificarColeccion(this.coleccion).subscribe(
      (resultado) => {
        console.log(resultado);
        if (resultado){
          this.messageService.add({severity: 'success', summary: 'Coleccion', detail: 'Coleccion modificado correctamente.'});
          this.cerrarDialogo.emit();
        }
        else{
          this.messageService.add({severity: 'error', summary: 'Coleccion', detail: 'Hubo un problema al modificar el coleccion.'});
        }
      },
    );
    }

    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    calcularTotal(data: MatCheckboxChange, precio: number, id: number): void{

      if (data.checked)
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

