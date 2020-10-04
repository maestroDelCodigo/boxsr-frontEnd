import { Component, OnInit } from '@angular/core';
import { ColeccionesService } from '../../core/colecciones.service';
import { Coleccion } from '../../models/Coleccion';

@Component({
  selector: 'app-colecciones',
  templateUrl: './colecciones.component.html',
  styleUrls: ['./colecciones.component.scss']
})
export class ColeccionesComponent implements OnInit {
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
  }

  borrarColeccion(id: number){
   this.coleccionesService.descatalogarColeccion(id, 1).subscribe(
     () => this.obtenerColecciones()
   );

  }


}
