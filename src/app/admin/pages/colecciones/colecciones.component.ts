import { Component, OnInit, ViewChild, } from '@angular/core';
import { ColeccionesService } from '../../core/colecciones.service';
import { Coleccion } from '../../models/Coleccion';
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

  onMostrarCrearColecciones(){
    this.mostrarCrearColecciones = true;
  }

  onOcultarCrearColecciones(){
    this.mostrarCrearColecciones = false;
    this.list.refresh();
  }

  obtenerColecciones(){
    this.coleccionesService.listarColecciones().subscribe(
      (colecciones) =>{
        this.colecciones = colecciones;

        console.log(colecciones);
      }
    );
  }

  modificarColeccion(coleccion: Coleccion){
    this.coleccionModificar = coleccion;
    this.mostrarModificarColecciones = true;
  }

  onOcultarModificarColecciones(){
    this.mostrarModificarColecciones = false;
    this.list.refresh();
  }

  borrarColeccion(id: number){
   this.coleccionesService.descatalogarColeccion(id, true).subscribe(
     () => this.list.refresh()
   );

  }


}
