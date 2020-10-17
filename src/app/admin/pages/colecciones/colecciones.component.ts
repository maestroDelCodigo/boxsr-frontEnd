import { Component, OnInit, ViewChild, } from '@angular/core';
import { Coleccion } from 'src/app/models/coleccion';
import { ColeccionesService } from '../../core/colecciones.service';
import { ColeccionesListComponent } from './colecciones-list/colecciones-list.component';

@Component({
  selector: 'app-colecciones',
  templateUrl: './colecciones.component.html',
  styleUrls: ['./colecciones.component.scss']
})
export class ColeccionesComponent implements OnInit {
  @ViewChild(ColeccionesListComponent) list: ColeccionesListComponent;
  mostrarCrearColecciones = false;
  mostrarModificarColecciones = false;
  colecciones: Coleccion[] = [];
  coleccionModificar: Coleccion = null;

  constructor(private coleccionesService: ColeccionesService) { }

  ngOnInit(): void {
    this.obtenerColecciones();
  }

  onMostrarCrearColecciones(): void{
    this.mostrarCrearColecciones = true;
  }

  onOcultarCrearColecciones(): void{
    this.mostrarCrearColecciones = false;
    this.list.refresh();
  }

  obtenerColecciones(): void{
    this.coleccionesService.listarColecciones().subscribe(
      (colecciones) =>{
        this.colecciones = colecciones;

        console.log(colecciones);
      }
    );
  }

  modificarColeccion(coleccion: Coleccion): void{
    this.coleccionModificar = coleccion;
    this.mostrarModificarColecciones = true;
  }

  onOcultarModificarColecciones(): void{
    this.mostrarModificarColecciones = false;
    this.list.refresh();
  }

  borrarColeccion(coleccion: Coleccion): void{

  const activo = coleccion.deleted === 0 ? 1 : 0;

  this.coleccionesService.descatalogarColeccion(coleccion.coleccion_id, activo).subscribe(
     () => this.list.refresh()
   );

  }


}
