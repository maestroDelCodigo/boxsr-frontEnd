import { Injectable } from '@angular/core';
import { IdName } from '../admin/models/id-name';
import { ProductoTipo} from '../models/producto-tipo.enum';

@Injectable({
  providedIn: 'root'
})
export class TiposProductoService {

  constructor() { }

  getTipoProducto(): IdName[]{
    return[
      {
        id: ProductoTipo.Natural,
        name: 'Natural'
      },
      {
        id: ProductoTipo.Afeitado,
        name: 'Afeitado'
      },
      {
        id: ProductoTipo.Antiarrugas,
        name: 'Antiarrugas'
      },
      {
        id: ProductoTipo.Antiojeras,
        name: 'Antiojeras'
      },
      {
        id: ProductoTipo.Barba,
        name: 'Barba'
      },
      {
        id: ProductoTipo.BOXSR,
        name: 'BOXSR'
      },
      {
        id: ProductoTipo.Corporal,
        name: 'Corporal'
      },
      {
        id: ProductoTipo.Muestras,
        name: 'Muestras'
      }
    ]
  }
}
