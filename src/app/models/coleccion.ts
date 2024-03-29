export class Coleccion {
  // tslint:disable-next-line:variable-name
  coleccion_id: number;
  nombre: string;
  deleted: number;
  // tslint:disable-next-line:variable-name
  video_url: string;
  // tslint:disable-next-line:variable-name
  precio_rebajado: number;
  // tslint:disable-next-line:variable-name
  precio_original: number;
  // tslint:disable-next-line:variable-name
  productos_asociados?: number[];
  descripcion: string;
  // tslint:disable-next-line:variable-name
  descripcion_sirve: string;
  // tslint:disable-next-line:variable-name
  descripcion_resumen: string;
  // tslint:disable-next-line:variable-name
  descripcion_usa: string;
  // tslint:disable-next-line:variable-name
  descripcion_ingredientes: string;
  // tslint:disable-next-line: variable-name
  nombre_imagen: string;
  // tslint:disable-next-line:variable-name
  imagen_url: string;
  precio: number;

  constructor(item?: any) {
    this.nombre = item?.nombre || '';
    this.deleted = item?.deleted || '';
    this.video_url = item?.video_url || '';
    this.precio_rebajado = item?.precio_rebajado || null;
    this.precio_original = item?.precio_original || null;
    this.productos_asociados = item?.productos_asociados || [];
    this.descripcion = item?.descripcion || '';
    this.descripcion_resumen = item?.descripcion_resumen || '';
    this.descripcion_sirve = item?.descripcion_sirve || '';
    this.descripcion_usa = item?.descripcion_usa || '';
    this.descripcion_ingredientes = item?.descripcion_ingredientes || '';
    this.nombre_imagen = item?.nombre_imagen || '';
    this.imagen_url = item?.imagen_url || '';
    this.precio = item?.precio || null;
  }
}
