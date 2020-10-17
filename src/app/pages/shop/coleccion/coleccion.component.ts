import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColeccionesService } from 'src/app/admin/core/colecciones.service';
import { MessengerService } from 'src/app/admin/core/messenger.service';
import { Coleccion } from 'src/app/models/coleccion';

@Component({
  selector: 'app-coleccion',
  templateUrl: './coleccion.component.html',
  styleUrls: ['./coleccion.component.scss']
})
export class ColeccionComponent implements OnInit {
  coleccion: Coleccion;

  private coleccionId: any;

  constructor(
    private coleccionesService: ColeccionesService,
    private messengerService: MessengerService,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((x) => {
      this.coleccionId = x?.id || null;
    });
  }

  ngOnInit(): void {
    if (this.coleccionId) {
      this.coleccionesService.buscarColeccion(this.coleccionId).subscribe(coleccion => {
        this.coleccion = coleccion;
        console.log(this.coleccion);
      });
    }
  }

  AddAlCarrito(): void {
    this.messengerService.sendMsg(this.coleccion);
  }
}
